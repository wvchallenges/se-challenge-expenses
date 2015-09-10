<?php namespace App\Http\Controllers;

use App\Expense;
use App\Http\Requests;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Input;
use DB;

use App\UploadedFile;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $pageSize = 10;
        if($size = Input::get('pageSize')) $pageSize = $size;

        $expenses = Expense::paginate($pageSize);

        $totalCost = Expense::select(DB::raw('(SUM(tax_amount)+SUM(`pre-tax_amount`)) AS TOTAL'))
                            ->take($pageSize)
                            ->first();

        $amounts = Expense::select(DB::raw('((tax_amount)+(`pre-tax_amount`)) AS TOTAL'))
                            ->take($pageSize)
                            ->get();

        $data = ['data' =>
            [
                'expenses' => $expenses,
                'totalCost' => $totalCost,
                'amounts' => $amounts
            ]
        ];

        return view('layout', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        if ($request->hasFile('file') and $request->file('file')->isValid())
        {
            $f = $request->file('file');
            $uploadedFileContent = [
                'size' => $f->getClientSize(),
                'original_name' => $f->getClientOriginalName(),
                'extension' => $f->getClientOriginalExtension()
            ];

            $uploadedFile = new UploadedFile();
            if(!$uploadedFile->validateFile($uploadedFileContent))
                return Response($uploadedFile->getErrors(), 400);

            list($result, $expenseFile) = [[], fopen($f, 'r')];
            while(($line = fgetcsv($expenseFile))) array_push($result, $line); //Get all lines as csv
            fclose($expenseFile);

            $result = $this->parseCsv($result);
            if(!($result instanceof Response))
                $this->saveModel($uploadedFileContent, $uploadedFile); //Save file info on success
            return $result;
        } //TODO: What to do otherwise?
    }

    public function parseCsv($contents) {
        $header = array_shift($contents);
        if($header === null) //Check for header
            return Response('Header not found for csv file', 400);

        $headings = $this->matchHeaderWithModel($header, new Expense());
        $cHeadings = count($headings);
        if($cHeadings === 0)
            return Response('Invalid Header', 400);

        $expenseModel = new Expense();
        $models = [];
        foreach($contents as $k => $line) {
            $modelContent = [];
            for($i = 0; $i < $cHeadings; $i++) {
                if($headings[$i] !== null) {
                    $fixedChunk = trim($line[$i]); //Trim whitespace on both ends
                    if(is_numeric($fixedChunk)) { //Check column represents a number
                        $fixedChunk = strpos($fixedChunk, ',') ? str_replace(',', '', $fixedChunk) : $fixedChunk;
                    } elseif (strtotime($fixedChunk)) { //Check column represents a date
                        $fixedChunk = new Carbon($fixedChunk);
                    }
                    $modelContent[$headings[$i]] = $fixedChunk;
                }
            }

            if(!$expenseModel->validateExpense($modelContent))
                return Response($expenseModel->getErrors(), 400);
            array_push($models, $modelContent);
        }
        return $this->saveExpenseModels($models);
    }

    public function saveModel($content, $model) {
        foreach($content as $k => $v)
            $model->$k = $v;
        $model->save();
    }

    public function saveExpenseModels($models) {
        foreach($models as $m)
            $this->saveModel($m, new Expense());
        return $models;
    }

    public function matchHeaderWithModel ($headings, $model) {
        $modelProperties = $model->getFillable();
        $result = [];

        foreach($headings as $h) {
            $fixedHeading = str_replace(" ", "_", $h);
            if (in_array($h, $modelProperties) || in_array($fixedHeading, $modelProperties)) {
                array_push($result, $fixedHeading);
            } else {
                array_push($result, null);
            }
        }
        return $result;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request $request
     * @param  int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
