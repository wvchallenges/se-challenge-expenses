using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wave
{
    public class Helper
    {
        public static string[] PreProcessLine(string line)
        {
            var values = new List<string>();
            try
            {
                var compound = false;
                var part = string.Empty;
                foreach (var ch in line.ToCharArray())
                {
                    if (ch == '"')
                    {
                        compound = !compound;
                    }
                    else if ((ch == ',') && !compound)
                    {
                        values.Add(part);
                        part = string.Empty;
                    }
                    else
                        part += ch;
                }

                //Last part
                values.Add(part);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return values.ToArray();
        }
        public static string[] PreProcessHeader(string header)
        {
            var headers = header.Split(',');
            var columnNames = new string[headers.Length];
            var i = 0;
            foreach (var h in headers)
            {
                columnNames[i++] = h.Replace(' ', '_').Replace('-', '_').ToLower();
            }

            return columnNames;
        }
        public static DateTime PreProcessDateTime(string dateTimeString)
        {
            var parts = dateTimeString.Trim().Split('/');
            int year = 1900, month = 1, day = 1;

            var validFormat =
                int.TryParse(parts[0], out month) &&
                int.TryParse(parts[1], out day) &&
                int.TryParse(parts[2], out year);

            if (!validFormat)
            { //Invalid Date Format - return in-error value
                year = 1900;
                month = 1;
                day = 1;
            }

            return new DateTime(year, month, day);
        }
        public static Decimal PreProcessDecimal(string decimalString)
        {
            decimal value = -1;
            decimal.TryParse(decimalString.Trim(), out value);

            return value;
        }
    }
}