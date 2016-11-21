#!/usr/bin/env perl
use lib 'lib';
use Mojolicious::Lite;
use Mojo::Pg;
use UUID::Generator::PurePerl;
use SEChallenge::Model::Users;
use SEChallenge::Model::ExpenseProcessor;
use Cwd;


# ask for DB credentials
say "Please make sure the expense role and schema are created on the target database before proceeding!";
print "Enter Postgres host (leave blank for localhost):";
my $dbhost = <STDIN>;
chomp $dbhost;
$dbhost = 'localhost' unless $dbhost;
print "Enter Postgres database (leave blank for sechallenge):";
my $dbname = <STDIN>;
chomp $dbname;
$dbname = 'sechallenge' unless $dbname;

# Load model and helpers
helper users => sub { state $users = SEChallenge::Model::Users->new };
helper pg => sub { state $pg = Mojo::Pg->new("postgresql://expense:3xp3nse\@$dbhost/$dbname") };
helper xproc => sub { state $xproc = SEChallenge::Model::ExpenseProcessor->new(pg => app->pg) };

# test connection and schema
my $dbversion = app->pg->db->query('select version() as version')->hash->{version};
die 'Could not determine database version whilst trying to connect to: '.app->pg->dsn
  unless $dbversion =~ /^PostgreSQL.*$/;
say $dbversion;


# HMAC-SHA1 passphrase for signed cookies
app->secrets(['Give it away now!']);

# Application index (login)
any '/' => sub {
  my $c = shift;

  my $user = $c->param('user') || '';
  my $pass = $c->param('pass') || '';

  return $c->render unless $c->users->check($user, $pass);

  $c->session(user => $user);
  $c->flash(message => 'Thanks for logging in.');
  $c->redirect_to('upload');

} => 'index';

# Poor man's ACL
group {
  under sub {
    my $c = shift;
    return 1 if $c->session('user');
    $c->redirect_to('index');
    return undef;
  };
  get '/upload';
};

# Logout (expire session and redirect to login)
get '/logout' => sub {
  my $c = shift;
  $c->session(expires => 1);
  $c->redirect_to('index');
};

# Upload handler
post '/upload' => sub {
  my $c = shift;

  # Check file size
  return $c->render(text => 'File is too big.', status => 200)
    if $c->req->is_limit_exceeded; #16MB by default

  # save incoming file for processing
  return $c->redirect_to('upload') unless my $expenses = $c->param('expenses');
  my $size = $expenses->size;
  my $name = $expenses->filename;
  my $cwd = getcwd();
  my @date = gmtime();
  my $ts = ($date[5]+1900).($date[4]+1).$date[3].$date[2].$date[1].$date[0];
  my $ug = UUID::Generator::PurePerl->new();
  my $uuid = $ug->generate_v1();
  my $filename = qq|$cwd/uploads/XR-$ts-$uuid.csv|;
  $expenses->move_to($filename);

  # In a real system I would use a non-blocking approach.
  # I.e. return 206 + Location at this point and use a background
  # thread and/or use Mojo's reactor-pattern with something like
  # Mojo::IOLoop in the case of this particular framework.
  
  # Another option which I have successfully used in the past (and
  # would generally be inclined to (especially with a smart back-end
  # like Postgres) would be to move the data processing logic down to
  # the database using PL (PL/PgSQL, PL/Perl, etc.) and let the
  # database do the import directly, freeing the application server
  # from this very data-centric tasks and reducing complexity
  # in the application server code and enhancing performance.

  # In any case, the file is already stored with a unique name so the
  # code is already structured to grow to an async processing. But for
  # the prototype the following call is sync to the http request:

  my $id = $c->xproc->process($filename, $uuid, $c->session('user'));
  $c->redirect_to("report/$id");

};

get '/report/:id' => sub {
  my $c = shift;
  my $report = $c->xproc->expense_report($c->param('id'));
  $c->render(report => $report);
} => 'expense-report';


app->start;


