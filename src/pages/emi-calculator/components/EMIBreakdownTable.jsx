import React, { useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Button from '../../../components/ui/Button';

const EMIBreakdownTable = ({ result }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  if (!result) return null;

  // Ensure numbers (in case props are strings)
  const principalNum = Number(result.principal || 0);
  const rateNum = Number(result.rate || 0);
  const tenureNum = Number(result.tenure || 0);
  const emiNum = Number(result.emi || 0);

  // Generate breakdown memoized
  const breakdown = useMemo(() => {
    const rows = [];
    let remainingPrincipal = principalNum;
    const monthlyRate = rateNum / 100 / 12;

    // Protect against invalid tenure
    const months = Math.max(0, Math.floor(tenureNum));

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      let principalPayment = emiNum - interestPayment;

      // Guard: when EMI < interest (rare), principalPayment could be negative
      if (principalPayment < 0) principalPayment = 0;

      remainingPrincipal -= principalPayment;

      // Avoid tiny floating negative balances
      if (remainingPrincipal < 1e-8) remainingPrincipal = 0;

      rows.push({
        month,
        emi: emiNum,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingPrincipal
      });
    }

    return rows;
  }, [principalNum, rateNum, tenureNum, emiNum]);

  const totalPages = Math.ceil(breakdown.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = breakdown.slice(startIndex, endIndex);

  const formatCurrency = (amount) => {
    const value = Number(amount || 0);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  // PDF download using autoTable(doc, ...) to avoid doc.autoTable issues
  const downloadBreakdown = () => {
    if (!breakdown || breakdown.length === 0) return;

    const doc = new jsPDF('p', 'pt'); // portrait, points
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(14);
    doc.text('EMI Breakdown', pageWidth / 2, 28, { align: 'center' });

    // Table head and body
    const head = [['Month', 'EMI', 'Principal', 'Interest', 'Balance']];
    const body = breakdown.map(row => [
      String(row.month),
      formatCurrency(row.emi),
      formatCurrency(row.principal),
      formatCurrency(row.interest),
      formatCurrency(row.balance)
    ]);

    // Add table. startY slightly below title
    autoTable(doc, {
      head,
      body,
      startY: 44,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 6 },
      headStyles: { fillColor: [240, 240, 240], textColor: 20 },
      didDrawPage: (data) => {
        // Footer with page numbers
        const pageCount = doc.getNumberOfPages();
        const footerStr = `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`;
        doc.setFontSize(9);
        doc.text(footerStr, pageWidth - 40, doc.internal.pageSize.getHeight() - 8, { align: 'right' });
      }
    });

    doc.save('emi-breakdown.pdf');
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
            {currentData.map((row, index) => (
              <tr key={row.month} className={`border-b border-border ${index % 2 === 0 ? 'bg-muted/30' : ''}`}>
                <td className="py-3 px-4 text-sm font-medium text-foreground">{row.month}</td>
                <td className="py-3 px-4 text-sm text-right text-foreground">{formatCurrency(row.emi)}</td>
                <td className="py-3 px-4 text-sm text-right text-success">{formatCurrency(row.principal)}</td>
                <td className="py-3 px-4 text-sm text-right text-warning">{formatCurrency(row.interest)}</td>
                <td className="py-3 px-4 text-sm text-right text-muted-foreground">{formatCurrency(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {currentData.map((row) => (
          <div key={row.month} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Month {row.month}</span>
              <span className="text-lg font-bold text-primary">{formatCurrency(row.emi)}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Principal:</span>
                <span className="font-medium text-success ml-2">{formatCurrency(row.principal)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Interest:</span>
                <span className="font-medium text-warning ml-2">{formatCurrency(row.interest)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Remaining Balance:</span>
                <span className="font-medium text-foreground ml-2">{formatCurrency(row.balance)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, breakdown.length)} of {breakdown.length} months
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
