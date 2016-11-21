package SEChallenge::Model::ExpenseProcessor;

use strict;
use warnings;
use Mojo::Base -base;
use Mojo::Log;
use Text::CSV_PP;
use Data::Dumper;

has 'pg';


my @report_fields = (
  'date',
  'category',
  'employee name',
  'employee address',
  'expense description',
  'pre-tax amount',
  'tax name',
  'tax amount'
);

my $log = Mojo::Log->new;

sub process {
  my ($self, $file, $uid, $user) = @_;

  (my $q = q|insert into expense_report (description,file,loaded_by)
  values (?,?,?) returning id|) =~ s/^\s+//mg;


  $log->debug("Processing new expense file");
  
  my $desc = "Expense report $uid";
  my $report = $self->pg->db->query($q, $desc, $file,$user)->hash;
  my $report_id = $report->{id};

  my @lines;
  open(my $fh, '<:encoding(UTF-8)', $file)
    or die "Could not open file '$file' $!";

  # check header line, abort if it doesn't match expected
  
  my $line = <$fh>;
  chomp $line;
  my @fields = split /,/,$line;
  return undef unless @fields ~~ @report_fields;
  
  while ($line = <$fh>){
    chomp $line;

    # parse line
    my $csv = Text::CSV_PP->new(); 
    my $status  = $csv->parse($line);
    return undef unless $status;
    my @data = $csv->fields(); 


    # check to see if employee exists else create or update address
    $log->debug("Processing employee...");

    my $employee_name = &trim($data[&field_index('employee name')]);
    my ($first,$last) = split /\s+/, $employee_name;
    my $address = $data[&field_index('employee address')];

    $q = qq|select * from employee where lastname=? and firstname=?|;
    my $employee = $self->pg->db->query($q,$last,$first)->hash;
    my $employee_id = $employee->{id};
    unless($employee_id){
      ($q = qq|insert into employee (lastname,firstname,address)
      values (?,?,?) returning id|)  =~ s/^\s+//mg;
      $employee_id = $self->pg->db->query($q,$last,$first,$address)->hash->{id};
    } elsif($employee->{address} ne $address) {
      $q = qq|update employee set address=? where id=?|;
      $self->pg->db->query($q,$address,$employee_id);      
    }

    # check to see if category exists else create
    $log->debug("Processing category...");

    my $category_name = &trim($data[&field_index('category')]);
    
    $q = qq|select * from expense_category where name=?|;
    my $category = $self->pg->db->query($q,$category_name)->hash;
    my $category_id = $category->{id};
    unless($category_id){
      $q = qq|insert into expense_category (name) values (?) returning id|;
      $category_id = $self->pg->db->query($q,$category_name)->hash->{id};
    }


    # check to see if tax exists else create or update tax rate
    $log->debug("Processing tax...");

    my $amount = &number($data[&field_index('pre-tax amount')]);
    my $tax_name = &trim($data[&field_index('tax name')]);
    my $tax_amount = &number($data[&field_index('tax amount')]);
    # cents rounding should be ok if rate is rounded to 3 decimal places (e.g. NY Tax) ;-)
    my $tax_rate = $amount > 0 && $tax_amount > 0 ? sprintf("%.3f", ($tax_amount / $amount)*100) : 0;

    $q = qq|select * from tax where name=?|;
    my $tax = $self->pg->db->query($q,$tax_name)->hash;
    my $tax_id = $tax->{id};
    unless($tax_id){
      $q = qq|insert into tax (name,rate) values (?,?) returning id|;
      $tax_id = $self->pg->db->query($q,$tax_name,$tax_rate)->hash->{id};
    } elsif($tax->{rate} > 0 && $tax->{rate} != $tax_rate) {
      $q = qq|update tax set rate=? where id=?|;
      $self->pg->db->query($q,$tax_rate,$tax_id);      
    }

    my $description = &trim($data[&field_index('expense description')]);

    my $date = &trim($data[&field_index('date')]);
    # change MM/DD/YYYY to iso date YYYY-MM-DD
    $date =~ /(\d+)\/(\d+)\/(\d+)/;
    $date = "$3-$1-$2";
    
    # insert the expense line
    ($q = q| insert into expense_line (expense_report_id, employee_id, 
    expense_category_id, description, amount, tax_id, tax_amount, 
    date, total) values (?,?,?,?,?,?,?,?,?)|) =~ s/^\s+//mg;

    $self->pg->db->query($q,$report_id, $employee_id, $category_id,
                         $description, $amount, $tax_id, $tax_amount,
                         $date, $amount+$tax_amount);      
    
  }
  close $fh;
  return $report_id;
  
}

sub expense_report {
  my ($self, $report_id) = @_;

  $log->debug("Creating expense report: $report_id...");

  my %expense_report = (
    month_name => {
      1  => 'January',
      2  => 'February',
      3  => 'March',
      4  => 'April',
      5  => 'May',
      6  => 'June',
      7  => 'July',
      8  => 'August',
      9  => 'September',
      10 => 'October',
      11 => 'November',
      12 => 'December',
    }
  );
    
  my $q = q|select * from expense_report where id=?|;
  my $report = $self->pg->db->query($q,$report_id)->hash;
  return undef unless $report->{id};

  $expense_report{id} = $report->{id};
  $expense_report{description} = $report->{description};
  $expense_report{file} = $report->{file};
  $expense_report{loaded_by} = $report->{loaded_by};
  $expense_report{created} = $report->{created};

  # get report years
  ($q = q|select distinct extract(year from date) as year 
  from expense_line where expense_report_id = ? order by year|) =~ s/^\s+//mg;

  $expense_report{years} = [ ];
  push @{$expense_report{years}}, $_->{year}
    for $self->pg->db->query($q, $expense_report{id})->hashes->each;

  $log->debug("Report years:".Dumper(%expense_report{years}));
  
  # get report months and expense lines by month

  $expense_report{months_by_year} = [ ];
  $expense_report{lines_by_month} = [ ];

  foreach my $year (@{$expense_report{years}}){

    # months by year
    ($q = q|select distinct extract(month from date) as month 
    from expense_line where extract(year from date) = ? 
    and expense_report_id = ? order by month|) =~ s/^\s+//mg;
    my @months = ( );
    push @months, $_->{month}
      for $self->pg->db->query($q, $year, $expense_report{id})->hashes->each;
    push @{$expense_report{months_by_year}},\@months;
      
    # lines by month
    foreach my $month (@months) {
      my @lines = ( );
      ($q = q|select a.date as date, b.lastname as lastname, b.firstname as firstname, 
      b.address as address, c.name as category, a.description as description, a.amount,
      d.name as tax, d.rate as tax_rate, a.tax_amount as tax_amount, a.total as total 
      from expense_line a, employee b, expense_category c, tax d
      where a.employee_id = b.id and a.expense_category_id = c.id and a.tax_id = d.id
      and extract(month from a.date) = ? and extract(year from a.date) = ? 
      and expense_report_id = ? order by a.date|) =~ s/^\s+//mg;
      push @lines, $_
        for $self->pg->db->query($q, $month, $year, $expense_report{id})->hashes->each;
      push @{$expense_report{lines_by_month}}, \@lines;
    }
    
  }

  $log->debug("Report structure:".Dumper(%expense_report));

  return \%expense_report;

}

sub field_index {
  my $field = shift;
  my ($index) = grep { $report_fields[$_] eq $field } 0..$#report_fields;
  return $index;
}

sub trim {
  my $string = shift;
  $string =~ s/^\s+|\s+$//g;
  return $string;
}

sub number {
  my $string = shift;
  $string = &trim($string);
  $string =~ s/,//;
  return $string;
}

1;
