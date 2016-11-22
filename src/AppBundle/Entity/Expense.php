<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Expense
 *
 * @ORM\Table(name="expense")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\ExpenseRepository")
 */
class Expense
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * 
     * @var \DateTime
     * 
     * @ORM\Column(name="expense_date", type="datetime")
     * @Assert\DateTime()
     */
    private $expenseDate;
    
    /**
     * @var string
     *
     * @ORM\Column(name="category", type="string", length=191)
     */
    private $category;

    /**
     * @var string
     *
     * @ORM\Column(name="employee_name", type="string", length=191)
     */
    private $employeeName;

    /**
     * @var string
     *
     * @ORM\Column(name="employee_address", type="text")
     */
    private $employeeAddress;

    /**
     * @var string
     *
     * @ORM\Column(name="expense_description", type="string", length=255)
     */
    private $expenseDescription;

    /**
     * @var string
     *
     * @ORM\Column(name="pre_tax_amount", type="decimal", precision=14, scale=4)
     */
    private $preTaxAmount;

    /**
     * @var string
     *
     * @ORM\Column(name="tax_name", type="string", length=255)
     */
    private $taxName;

    /**
     * @var string
     *
     * @ORM\Column(name="tax_amount", type="decimal", precision=14, scale=4)
     */
    private $taxAmount;

    /**
     * 
     * @var string
     * 
     * @ORM\Column(name="hash", type="string", length=40, unique=true)
     */
    private $hash;
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set category
     *
     * @param string $category
     * @return Expense
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set employeeName
     *
     * @param string $employeeName
     * @return Expense
     */
    public function setEmployeeName($employeeName)
    {
        $this->employeeName = $employeeName;

        return $this;
    }

    /**
     * Get employeeName
     *
     * @return string 
     */
    public function getEmployeeName()
    {
        return $this->employeeName;
    }

    /**
     * Set employeeAddress
     *
     * @param string $employeeAddress
     * @return Expense
     */
    public function setEmployeeAddress($employeeAddress)
    {
        $this->employeeAddress = $employeeAddress;

        return $this;
    }

    /**
     * Get employeeAddress
     *
     * @return string 
     */
    public function getEmployeeAddress()
    {
        return $this->employeeAddress;
    }

    /**
     * Set expenseDescription
     *
     * @param string $expenseDescription
     * @return Expense
     */
    public function setExpenseDescription($expenseDescription)
    {
        $this->expenseDescription = $expenseDescription;

        return $this;
    }

    /**
     * Get expenseDescription
     *
     * @return string 
     */
    public function getExpenseDescription()
    {
        return $this->expenseDescription;
    }

    /**
     * Set preTaxAmount
     *
     * @param string $preTaxAmount
     * @return Expense
     */
    public function setPreTaxAmount($preTaxAmount)
    {
        $this->preTaxAmount = $preTaxAmount;

        return $this;
    }

    /**
     * Get preTaxAmount
     *
     * @return string 
     */
    public function getPreTaxAmount()
    {
        return $this->preTaxAmount;
    }

    /**
     * Set taxName
     *
     * @param string $taxName
     * @return Expense
     */
    public function setTaxName($taxName)
    {
        $this->taxName = $taxName;

        return $this;
    }

    /**
     * Get taxName
     *
     * @return string 
     */
    public function getTaxName()
    {
        return $this->taxName;
    }

    /**
     * Set taxAmount
     *
     * @param string $taxAmount
     * @return Expense
     */
    public function setTaxAmount($taxAmount)
    {
        $this->taxAmount = $taxAmount;

        return $this;
    }

    /**
     * Get taxAmount
     *
     * @return string 
     */
    public function getTaxAmount()
    {
        return $this->taxAmount;
    }
	
	/**
	 *
	 * @return \DateTime
	 */
	public function getExpenseDate() 
	{
		return $this->expenseDate;
	}
	
	/**
	 *
	 * @param \DateTime $expenseDate        	
	 * @return Expense
	 */
	public function setExpenseDate(\DateTime $expenseDate) 
	{
		$this->expenseDate = $expenseDate;
		
		return $this;
	}
	
	/**
	 *
	 * @return the string
	 */
	public function getHash() 
	{
		return $this->hash;
	}
	
	/**
	 *
	 * @param
	 *        	$hash
	 * @return Expense
	 */
	public function setHash($hash) 
	{
		$this->hash = $hash;
		
		return $this;
	}
	
	
}
