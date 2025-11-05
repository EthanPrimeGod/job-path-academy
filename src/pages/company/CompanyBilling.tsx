import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockInvoices } from "@/data/company-mock";
import { CreditCard } from "lucide-react";

export default function CompanyBilling() {
  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and payment methods</p>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription details</CardDescription>
              </div>
              <Button>Manage Plan</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Plan</p>
                <p className="text-lg font-semibold">Professional</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next Charge</p>
                <p className="text-lg font-semibold">Feb 1, 2025</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">$299.00 / month</p>
                  <p className="text-sm text-muted-foreground">Unlimited job postings • Advanced analytics</p>
                </div>
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your default payment method</CardDescription>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="h-12 w-12 bg-background rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Download and view past invoices</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="font-medium">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === "paid" ? "default" : "secondary"}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </CompanyLayout>
  );
}
