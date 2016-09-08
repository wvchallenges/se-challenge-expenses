namespace Utilities.DateTimeUtility {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    export function getMonthShortName(monthNumber) {
        return monthShortNames[monthNumber -1];
    }
}