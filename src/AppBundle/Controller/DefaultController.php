<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\FileUploadType;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\CsvFile\CsvFileReader;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use AppBundle\CsvFile\CsvFileException;
use Knp\Component\Pager\Paginator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Predis\Client;


class DefaultController extends Controller
{
	/**
	 * 
	 * @return Paginator
	 */
	protected function getPaginator()
	{
		return $this->get('knp_paginator');
	}
	
	/**
	 * 
	 * @return Client
	 */
	protected function getRedis()
	{
		return $this->get('snc_redis.default');
	}
	
    /**
     * @Route("/", name="homepage")
     * @Method({"GET","POST"})
     * @Template()
     */
    public function indexAction(Request $request)
    {
    	$uploadForm = $this->createForm(new FileUploadType());
   	
    	if ($request->isMethod('POST')) {
    		$uploadForm->submit($request);
    		
    		if ($uploadForm->isValid()) {
    			// lets check the upload file headers to ensure they contain the expected headers
    			$file = $uploadForm->get('datafile')->getData();
    			if ($file instanceof UploadedFile) {
    				// Rename the file
    				$fileName = sha1(uniqid()).'.'.$file->guessExtension();
    				$movedFile = $file->move(sys_get_temp_dir(), $fileName);
    				$pathName = $movedFile->getPathname();
    				
    				try {
    					$csvFile = new CsvFileReader($pathName, true);
    					
    					$expectedHeaders = array(
    							'date', 
    							'category', 
    							'employee name', 
    							'employee address', 
    							'expense description', 
    							'pre-tax amount', 
    							'tax name', 
    							'tax amount'
    					);

    					// if the expectedHeaders all appear in the given file headers, then we have the data needed
    					$section = array_intersect_key(
    							array_flip($expectedHeaders), 
    							$csvFile->getHeader()
    					);
    					    					
    					// now if the count of section does not match count of expected.. then header doesnt match
    					if (count($section) === 8) { // 8 = count($expectedHeaders)
    						// lets queue the file for processing
    						$this->get('expense.datafile.producer')->publish(json_encode([
    								'filePath' => $pathName
    						]));

    						return $this->redirectToRoute('homepage');
    					}
    					else {
    						unset($csvFile);
    					}
    				}
    				catch (CsvFileException $cfe) {
    					$this->get('logger')->error($cfe->getMessage());
    				}
    				catch (\RuntimeException $re) {
    					$this->get('logger')->error($re->getMessage());
    				}
    			}    			
    		}
    	}
    	    	
        return array(
     		'uploadForm' => $uploadForm->createView()
        );
    }
    
    /**
     * @Route("/expenses/{page}", name="homepage_expenses")
     * @Method({"GET"})
     * @Template()
     */
    public function listAction(Request $request, $page = 1)
    {
    	// lets fetch the current list
    	$expenseQuery = $this->getDoctrine()->getManager()
    	->getRepository('AppBundle:Expense')
    	->getByMonthDateQuery();
    	 
    	$paginator  = $this->getPaginator();
    	 
    	$expensesResult = $expenseQuery->getResult();
    	 
    	$expenses = $paginator->paginate($expensesResult, $page, 10);
    	$expenses->setUsedRoute('homepage_expenses');
    	
    	return array(
    			'expenses' => $expenses
    	);
    }
    
    /**
     * @Route("/check", name="file_check")
     * @Method({"GET"})
     */
    public function checkAction(Request $request)
    {
    	$result = array(
    			'fileDone' => !$this->getRedis()->get('file-processing')
    	);
    	
    	return new JsonResponse($result);
    }
}
