/**
 * Created by sonukapoor on 16-08-18.
 */
(function ()
{
    /*globals angular*/

    angular.module('waveApp').factory('csvToJsonService',
        function ()
        {
            var csvToJsonService = {};

            csvToJsonService.toJSON = function (csv)
            {
                return csvToJSON(csv);
            };

            // convert the entire csv content into json        
            var csvToJSON = function (csv)
            {
                var content = {
                    csv: csv,
                    separator: ',',
                    header: true
                }
                var lines = content.csv.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                var result = [];
                var start = 0;
                var columnCount = lines[0].split(content.separator).length;

                var headers = [];
                if (content.header)
                {
                    headers = lines[0].split(content.separator);
                    start = 1;
                }

                for (var i = start; i < lines.length; i++)
                {
                    var obj = {};
                    var currentline = lines[i].split(new RegExp(content.separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
                    if (currentline.length === columnCount)
                    {
                        if (content.header)
                        {
                            for (var j = 0; j < headers.length; j++)
                            {
                                obj[headers[j]] = currentline[j];
                            }
                        } else
                        {
                            for (var k = 0; k < currentline.length; k++)
                            {
                                obj[k] = currentline[k];
                            }
                        }
                        result.push(obj);
                    }
                }
                return result;
            };

            return csvToJsonService;
        });
})();