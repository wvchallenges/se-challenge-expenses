<?php
namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\File;

class FileUploadType extends AbstractType
{
	public function configureOptions(OptionsResolver $resolver)
	{
		$collectionConstraint = new Collection(array(
				'datafile' => array(
						new File(array(
								'maxSize' => '2M',
								'mimeTypes' => ['text/csv', 'text/plain']
						)),
				)
		));
	
		$resolver->setDefaults(array(
				'constraints' => $collectionConstraint,
		));
	}
	
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('datafile', 'file', array(
                'label' => 'Expense Data File',
        ))
        ->add('upload', 'submit', array(
        		'attr' => array(
        				'class' => 'btn btn-primary'
        		)
        ))
        ;
    }

    public function getName()
    {
        return 'expense_datafile';
    }
}