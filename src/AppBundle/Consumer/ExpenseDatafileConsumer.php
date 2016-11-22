<?php

//src/Acme/DemoBundle/Consumer/UploadPictureConsumer.php

namespace AppBundle\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\DBAL\DBALException;
use AppBundle\Entity\Expense;
use AppBundle\CsvFile\CsvFileReader;
use AppBundle\CsvFile\CsvFileException;
use AppBundle\CsvFile\CsvRecordHandler;
use Predis\Client;

class ExpenseDatafileConsumer implements ConsumerInterface, CsvRecordHandler
{
	private $logger;
	
	private $entityManager;
	
	private $redis;
	
	private $discountProducer;
	
	private $expectedHeaders;
	
	public function __construct()
	{
		$this->expectedHeaders = array_flip(array(
				'date',
				'category',
				'employee name',
				'employee address',
				'expense description',
				'pre-tax amount',
				'tax name',
				'tax amount'
		));
	}
	
	public function setLogger(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}
	
	public function setEntityManager(EntityManager $entityManager)
	{
		$this->entityManager = $entityManager;
	}
		
	public function setRedis(Client $redis)
	{
		$this->redis = $redis;
	}
	
	/**
	 * 
	 * @param string $hash
	 * @return Expense|NULL
	 */
	private function getExpense($hash)
	{
		return $this->entityManager->getRepository('AppBundle:Expense')->findOneBy(
				['hash' => $hash]
		);
	}
	
	/**
	 * 
	 * {@inheritDoc}
	 * @see \OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface::execute()
	 */
    public function execute(AMQPMessage $msg)
    {
    	try {
    		$data = json_decode($msg->getBody(), true);
    	}
    	catch (\InvalidArgumentException $e) {
    		// allow ack
    		return;
    	}

    	// expected filePath
    	if (!isset($data['filePath']) || !is_file($data['filePath'])) {
    		return;
    	}
    	
    	// now process file line by line
    	try {
    		$csvFile = new CsvFileReader($data['filePath']);
    		
    		$this->redis->set('file-processing', true);
    		
    		// before we run the file, we delete the existing data
    		// NOTE: This isn't the best way but its the fastest and cleanest for this demo
    		$this->entityManager->getConnection()->query(
    				'START TRANSACTION; SET FOREIGN_KEY_CHECKS=0; TRUNCATE expense; SET FOREIGN_KEY_CHECKS=1; COMMIT;'
    				);
    		
    		// now process
    		$csvFile->execute($this);
    	}
    	catch (CsvFileException $cfe) {

    	}
    	catch (\RuntimeException $re) {

    	}
    	finally {
    		$this->redis->set('file-processing', false);
    	}
    }
    
	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::columnFilterHandler()
	 */
	public function columnFilterHandler(&$column, $header, $row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::columnValidatorHandler()
	 */
	public function columnValidatorHandler($column, $header, $row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::onColumnValidationError()
	 */
	public function onColumnValidationError($column, $header, $row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::rowFilterHandler()
	 */
	public function rowFilterHandler(&$row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::rowValidatorHandler()
	 */
	public function rowValidatorHandler($row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::onRowValidationError()
	 */
	public function onRowValidationError($row) 
	{
		// TODO: Auto-generated method stub

	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::onRecordEvent()
	 */
	public function onRecordEvent($record) 
	{
		$hashable = array_intersect_key($record, $this->expectedHeaders);

		// lets create a hash of the required headers
		ksort($hashable);
		
		$hash = sha1(json_encode($hashable));
		
		// does this expense already exist ? ..
		$expense = $this->getExpense($hash);
		
		if (! $expense instanceof Expense) {

			$expense = new Expense();
			$expense
			->setCategory($hashable['category'])
			->setEmployeeName($hashable['employee name'])
			->setEmployeeAddress($hashable['employee address'])
			->setExpenseDescription($hashable['expense description'])
			->setPreTaxAmount($hashable['pre-tax amount'])
			->setTaxName($hashable['tax name'])
			->setTaxAmount($hashable['tax amount'])
			->setExpenseDate(new \DateTime($hashable['date']))
			->setHash($hash)
			;
			
			try {
				$this->entityManager->persist($expense);
				$this->entityManager->flush($expense);
			}
			catch (DBALException $dbe) {
				$this->logger->error($dbe->getMessage());
			}
		}
	}

	/**
	 * {@inheritDoc}
	 * @see \AppBundle\CsvFile\CsvRecordHandler::onRecordError()
	 */
	public function onRecordError($record) 
	{
		// TODO: Auto-generated method stub

	}

}