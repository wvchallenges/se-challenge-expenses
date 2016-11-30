rem Remove previous code package
del ..\ZipKits\getResults.zip

rem Create new code package using the 7-Zip utility
7z a  -r ..\ZipKits\getResults.zip .

rem Install new code package in Lambda using the AWS CLI
aws lambda update-function-code --publish --function-name=getResults --zip-file fileb://../ZipKits/getResults.zip
