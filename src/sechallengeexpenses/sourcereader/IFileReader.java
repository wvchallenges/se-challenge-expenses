package sechallengeexpenses.sourcereader;

import java.util.List;

import sechallengeexpenses.model.Expense;

public interface IFileReader {
	
	/**
	 * Parse the file 
	 * @return List List of expenses from the file
	 */
	public List<Expense> readFile();
}
