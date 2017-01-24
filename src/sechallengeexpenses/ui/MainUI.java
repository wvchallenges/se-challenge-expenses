package sechallengeexpenses.ui;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Insets;
import java.awt.Label;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.util.Iterator;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import sechallengeexpenses.database.SQLiteDatabase;
import sechallengeexpenses.model.Employee;
import sechallengeexpenses.model.Expense;
import sechallengeexpenses.model.SaleTax;
import sechallengeexpenses.sourcereader.CSVFileReader;

public class MainUI extends JPanel implements ActionListener{
	private File file = null;
	private CSVFileReader reader = null;
	private SQLiteDatabase db = null;
	
	private Label lblFile;    // Declare a Label component 
	private JButton btnFile;   // Declare a Button component
	private JButton btnProcess;   // Declare a Button component
	private JFileChooser fcFile;
	private JTextArea txtLog;
	
	public MainUI() 
	{ 
		super(new BorderLayout());
		setPreferredSize(new Dimension(800,600));
		
		fcFile = new JFileChooser(new java.io.File("."));
		
		// file
		btnFile = new JButton("Open a File...");
		btnFile.addActionListener(this);
		
		btnProcess = new JButton("Process file...");
		btnProcess.addActionListener(this);
		
		JPanel pnlFile = new JPanel(); 
		pnlFile.add(btnFile);
		pnlFile.add(btnProcess);

		// log 
		txtLog = new JTextArea(5,20);
		txtLog.setMargin(new Insets(5,5,5,5));
		txtLog.setEditable(false);
        JScrollPane pnlLog = new JScrollPane(txtLog);
        
        add(pnlFile, BorderLayout.PAGE_START);
        add(pnlLog, BorderLayout.CENTER);
        
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
        if (e.getSource() == this.btnFile) {
            int returnVal = fcFile.showOpenDialog(MainUI.this);
 
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                this.file = fcFile.getSelectedFile();
                txtLog.append("Choose file: " + file.getName() + ".\n");
            } else {
            	txtLog.append("Choose file command cancelled by user.\n");
            }
            txtLog.setCaretPosition(txtLog.getDocument().getLength());
        } 
        else if(e.getSource() == this.btnProcess)
        {
        	if(this.file == null)
        	{
        		txtLog.append("No file is choosen. Click \"Open a File\" button.\n");
        	}
        	else
        	{
        		reader = new CSVFileReader(this.file);
        		List<Expense> expenses = reader.readFile();
        		txtLog.append("Read " + expenses.size() + " expense records from " + this.file.getAbsolutePath() +"\n");
        		
        		if((new File("test.db")).exists())
        		{
        			txtLog.append("test.db exists. Will append the expenses to the existing test.db.\n");
        		}
        		
        		this.db = new SQLiteDatabase();
        		this.db.connect(); 
        		
        		Iterator<Expense> iter = expenses.iterator();
        		
        		while(iter.hasNext())
        		{
        			db.insert(iter.next());
        		}
        		
        		txtLog.append("SQLite databse is created" + db.getConnection().toString() );
        		txtLog.append("The following is the content of the database\n");
        		txtLog.append("EMPLOYER Table:\n");
        		txtLog.append(db.printAll(Employee.class) + "\n");
        		txtLog.append("SALETAX Table:\n");
        		txtLog.append(db.printAll(SaleTax.class) + "\n");
        		txtLog.append("EXPENSE Table:\n");
        		txtLog.append(db.printAll(Expense.class) + "\n");
        	}
        }
	}

	public static void main(String[] args) {
		new MainUI();
		JFrame frame = new JFrame("SE Challenge Expenses");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(new MainUI());
        frame.setSize(800, 600);
        frame.pack();
        frame.setVisible(true);
    }
}
