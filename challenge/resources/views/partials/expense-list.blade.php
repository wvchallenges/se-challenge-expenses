<md-content class="md-padding">
    <md-card>
      <md-card-content>
        <h2 class="md-title">Expenses</h2>
        <p>
          Drag files in the box below or click the box below to upload a .csv file.
        </p>
          <md-content>
            <form action="/" class="dropzone">
              <div class="fallback">
                <input name="file" type="file" multiple />
              </div>
              <?php echo csrf_field(); ?>
            </form>
              @if($data['expenses'])
                <md-data-table-container>
                  <table md-data-table>
                    <thead md-order="order">
                      <th name="Category"></th>
                      <th name="Description"></th>
                      <th numeric name="Pre-tax Amount"></th>
                      <th numeric name="Tax Amount"></th>
                      <th numeric name="Total"></th>
                      <th name="Employee Name"></th>
                    </thead>

                    <tbody>
                      @for($i = 0; $i < count($data['expenses']); $i++)
                        <tr>
                            <td>{{ $data['expenses'][$i]['category'] }}</td>
                            <td>{{ $data['expenses'][$i]['expense_description'] }}</td>
                            <td>{{ $data['expenses'][$i]['pre-tax_amount'] }}</td>
                            <td>{{ $data['expenses'][$i]['tax_amount'] }}</td>
                            <td>{{ $data['expenses'][$i]['tax_amount'] + $data['expenses'][$i]['pre-tax_amount']}}</td>
                            <td>{{ $data['expenses'][$i]['employee_name']}}</td>
                            <!-- <md-divider></md-divider> -->
                        </tr>
                      @endfor
                    </tbody>
                  </table>
                </md-data-table-container>
              @else
                No expenses.
              @endif
              <div layout="row">
                <div flex="50" offset="25">
                  <treemap identifier="description"></treemap>
                </div>
              </div>
          </md-content>
      </md-card-content>
      @if($data['expenses'] && $data['expenses']->total() > $data['expenses']->perPage())
        <div class="md-actions" layout="row" layout-align="space-between end">
          @if($data['expenses']->currentPage() > 1)
            <md-button href="{{ $data['expenses']->previousPageUrl() }}" class="md-raised md-primary md-hue-1">Previous</md-button>
          @else
            <md-button ng-disabled="true"></md-button>
          @endif  
          @if($data['expenses']->hasMorePages())

            <md-button href="{{ $data['expenses']->nextPageUrl() }}" class="md-raised md-primary">Next</md-button>
          @endif    
        </div>
      @endif
    </md-card>
</md-content>
