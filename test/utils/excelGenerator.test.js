const { exportToExcel } = require('../../src');
const xlsx = require('xlsx');
const fs = require('fs');

jest.mock('xlsx', () => {
    return {
        utils: {
            book_new: jest.fn(),
            json_to_sheet: jest.fn(),
            book_append_sheet: jest.fn(),
        },
        writeFile: jest.fn()
    };
});

test('exportToExcel creates an Excel file with data', () => {
    const mockData = { lighthouseResult: { audits: { performance: { score: 1 } } } };
    const filePath = 'path/to/test.xlsx';
    exportToExcel(mockData, filePath);
    expect(xlsx.writeFile).toHaveBeenCalled();
});
