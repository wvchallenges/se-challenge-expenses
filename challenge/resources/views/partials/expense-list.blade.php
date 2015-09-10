<md-content class="md-padding">
    <md-card>
      <md-card-content>
        <h2 class="md-title">Paracosm</h2>
        <p>
          The titles of Washed Out's breakthrough song and the first single from Paracosm share the
          two most important words in Ernest Greene's musical language: feel it. It's a simple request, as well...
        </p>
          <md-content>
            <form action="/" class="dropzone">
              <div class="fallback">
                <input name="file" type="file" multiple />
              </div>
              <?php echo csrf_field(); ?>
            </form>
              @if($data['expenses'])
              <md-list>
                <md-subheader class="md-no-sticky">Expenses</md-subheader>
                @for($i = 0; $i < count($data['expenses']); $i++)
                    <md-list-item class="md-3-line">
                        <p>{{ $data['expenses'][$i]['category'] }}</p>
                        <p>{{ $data['expenses'][$i]['expense_description'] }}</p>
                        <p>{{ $data['expenses'][$i]['pre-tax_amount'] }}</p>
                        @if($data['amounts'])
                            <p>{{ $data['amounts'][$i]['TOTAL'] }}</p>
                        @endif
                        @if($data['totalCost'])
                            <p>{{ $data['totalCost']['TOTAL'] }}</p>
                        @endif
                        <md-divider></md-divider>
                      </div>
                    </md-list-item>
                @endfor
              </md-list>
              @else
                No expenses.
              @endif
          </md-content>
      </md-card-content>
      <div class="md-actions" layout="row" layout-align="end center">
        <md-button class="md-raised md-primary md-hue-1">Secondary</md-button>
        <md-button class="md-raised md-primary">Primary</md-button>
      </div>
    </md-card>
</md-content>
