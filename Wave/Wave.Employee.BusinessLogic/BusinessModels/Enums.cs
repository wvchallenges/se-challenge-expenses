using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wave.Employee.BusinessLogic.BusinessModels
{
    public enum Status
    {
        UploadInProgress = 1,
        UploadSuccessfull,
        UploadFailed,
        ValidationInProgress,
        ValidationSuccessfull,
        ValidationFailed,
        SentForProcessing,
        ProcessingStarted,
        ProcessingCompleted,
        ProcessingFailed,
        Aborted
    }
}
