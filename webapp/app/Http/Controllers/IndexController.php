<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Employee;
use App\ExpenseCategory;
use App\Expense;
use App\TaxType;

class IndexController extends Controller
{
    /**
     * Index action
     */
    public function index()
    {
        return view('index');
    }

    /**
     * File upload
     */
    public function store(Request $request)
    {
        if (!$request->dataFile->isValid()) {
            $request->session()->flash('error', 'File upload failed');
            return redirect('/');
        }

        $path = storage_path('app') . "/" . $request->dataFile->store('uploads');
        \Log::debug("Getting upload file: {$path}");

        if (!$fp = fopen($path, "r")) {
            $request->session()->flash('error', "Could not up open uploaded file");
            return redirect('/');
        }

        $columns = fgetcsv($fp, 2048, ",");
        while($details = fgetcsv($fp, 2048, ",")) {
            $values = [];
            foreach ($columns as $key => $column) {
                $values[$column] = $details[$key];
            }

            if (!$employee = $this->saveEmployee($request, $values)) {
                $request->session()->flash('error', "Could not import employee");
                return redirect('/');
            }

            if (!$expenseCategory = $this->saveCategory($request, $values)) {
                $request->session()->flash('error', "Could not import expense category");
                return redirect('/');
            }

            if (!$taxType = $this->saveTaxType($request, $values)) {
                $request->session()->flash('error', "Could not import tax type");
                return redirect('/');
            }

            $expense = Expense::firstOrCreate([
                'employee_id' => $employee->id,
                'expense_category_id' => $expenseCategory->id,
                'tax_type_id' => $taxType->id,
                'description' => $values['expense description'],
                'date' => strftime('%Y-%m-%d', strtotime($values['date'])),
                'pre_tax_amount' => floatval(str_replace(",", "", $values['pre-tax amount'])),
                'tax_amount' => floatval(str_replace(",", "", $values['tax amount']))
            ]);

            if (!$expense) {
                $request->session()->flash('error', "Could not import expense");
                return redirect('/');
            }

            \Log::debug("Saved the expense: {$expense->description}");
        }

        fclose($fp);
        Storage::delete($path);

        $request->session()->flash('success', 'File uploaded');

        return redirect('/');
    }

    /**
     * Saves to gets the expense category
     *
     * @param Request $request
     * @param $values
     * @return TaxType
     */
    public function saveTaxType(Request $request, $values)
    {
        $taxType = TaxType::firstOrCreate([
            'name' => $values['tax name']
        ]);

        if (!$taxType) {
            return null;
        }

        \Log::debug("Saved the tax type: {$taxType->name}");
        return $taxType;
    }


    /**
     * Saves to gets the expense category
     *
     * @param Request $request
     * @param $values
     * @return ExpenseCategory
     */
    public function saveCategory(Request $request, $values)
    {
        $expenseCategory = ExpenseCategory::firstOrCreate([
            'name' => $values['category']
        ]);

        if (!$expenseCategory) {
            return null;
        }

        \Log::debug("Saved the expense category: {$expenseCategory->name}");
        return $expenseCategory;
    }

    /**
     * Saves or gets the employee details
     * @param Request $request
     * @param $values
     * @return Employee
     */
    private function saveEmployee(Request $request, $values)
    {
        $employee = Employee::firstOrCreate([
            'name' => $values['employee name'],
            'address' => $values['employee address'],
        ]);

        if (!$employee) {
            return null;
        }

        \Log::debug("Saved employee: {$employee->name}");

        return $employee;
    }
}
