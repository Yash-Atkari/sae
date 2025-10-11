import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const EMIBreakdownTable = ({ result }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  if (!result) return null;

  const generateBreakdown = () => {
    const breakdown = [];
    let remainingPrincipal = result?.principal;
    const monthlyRate = result?.rate / 100 / 12;

    for (let month = 1; month <= result?.tenure; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = result?.emi - interestPayment;
      remainingPrincipal -= principalPayment;

      breakdown?.push({
        month,
        emi: result?.emi,
        principal: Math.max(0, principalPayment),
        interest: interestPayment,
        balance: Math.max(0, remainingPrincipal)
      });
    }

    return breakdown;
  };

  const breakdown = generateBreakdown();
  const totalPages = Math.ceil(breakdown?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = breakdown?.slice(startIndex, endIndex);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const downloadBreakdown = () => {
    const csvContent = [
      ['Month', 'EMI', 'Principal', 'Interest', 'Balance'],
      ...breakdown?.map(row => [
        row?.month,
        row?.emi?.toFixed(2),
        row?.principal?.toFixed(2),
        row?.interest?.toFixed(2),
        row?.balance?.toFixed(2)
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emi-breakdown.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Payment Schedule</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          onClick={downloadBreakdown}
        >
          Download
        </Button>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Month</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">EMI</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Principal</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Interest</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((row, index) => (
              <tr key={row?.month} className={`border-b border-border ${index % 2 === 0 ? 'bg-muted/30' : ''}`}>
                <td className="py-3 px-4 text-sm font-medium text-foreground">{row?.month}</td>
                <td className="py-3 px-4 text-sm text-right text-foreground">{formatCurrency(row?.emi)}</td>
                <td className="py-3 px-4 text-sm text-right text-success">{formatCurrency(row?.principal)}</td>
                <td className="py-3 px-4 text-sm text-right text-warning">{formatCurrency(row?.interest)}</td>
                <td className="py-3 px-4 text-sm text-right text-muted-foreground">{formatCurrency(row?.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentData?.map((row) => (
          <div key={row?.month} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Month {row?.month}</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(row?.emi)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Principal:</span>
                <span className="font-medium text-success ml-2">{formatCurrency(row?.principal)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Interest:</span>
                <span className="font-medium text-warning ml-2">{formatCurrency(row?.interest)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Remaining Balance:</span>
                <span className="font-medium text-foreground ml-2">{formatCurrency(row?.balance)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, breakdown?.length)} of {breakdown?.length} months
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
            <span className="text-sm text-foreground px-3">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EMIBreakdownTable;