"use client"

import prisma from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
type Contact = {
  name: string;
  email: string;
  company?: string; // Optional
  phone?: string;   // Optional
  inquiryType: 'GENERAL' | 'PRODUCT' | 'SUPPORT' | 'PARTNER';
  message: string;
  id?: number;      // Optional, if you need an identifier
  createdAt: number; // Optional, for timestamp
};



export default  function ContactQueriesPage() {




const [contacts, setContacts] = useState<Contact[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchContacts = async () => {
    setLoading(true);
    try {
    

      
      const response = await fetch(`/api/contact`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      
      const data = await response.json();
      setContacts(data);
      toast.success('contacts loaded successfully');
    } catch (error) {
      console.error('Error loading contact:', error);
      toast.error('Failed to load contact');
    } finally {
      setLoading(false);
    }
  };

  fetchContacts();
}, []);











// const contacts = [
//     {
//       id: 1,
//       name: "John Smith",
//       email: "john.smith@example.com",
//       company: "Acme Inc.",
//       phone: "+1 (555) 123-4567",
//       inquiryType: "Product Information",
//       message: "I'm interested in learning more about your premium heat exchangers and their specifications.",
//       createdAt: "2024-03-15T09:30:00Z"
//     },
//     {
//       id: 2,
//       name: "Emily Johnson",
//       email: "ejohnson@techcorp.com",
//       company: "TechCorp Solutions",
//       phone: "+1 (555) 987-6543",
//       inquiryType: "Bulk Order",
//       message: "We need to place a large order for cooling systems for our new data center project.",
//       createdAt: "2024-03-14T14:15:00Z"
//     },
//     {
//       id: 3,
//       name: "Robert Chen",
//       email: "robert.chen@manufacturing.com",
//       company: "",
//       phone: "+1 (555) 456-7890",
//       inquiryType: "Technical Support",
//       message: "Having issues with the installation of Model X-2000. Need troubleshooting assistance.",
//       createdAt: "2024-03-13T11:20:00Z"
//     },
//     {
//       id: 4,
//       name: "Sarah Williams",
//       email: "swilliams@gmail.com",
//       company: "",
//       phone: "-",
//       inquiryType: "General Inquiry",
//       message: "Could you send me your product catalog and price list for dairy equipment?",
//       createdAt: "2024-03-12T16:45:00Z"
//     },
//     {
//       id: 5,
//       name: "Michael Brown",
//       email: "michael.b@industrialeng.com",
//       company: "Industrial Engineering Partners",
//       phone: "+1 (555) 789-0123",
//       inquiryType: "Custom Solution",
//       message: "We have a specialized requirement for a high-pressure heat exchanger system. Looking for OEM partnership.",
//       createdAt: "2024-03-11T10:10:00Z"
//     },
//     {
//       id: 6,
//       name: "Lisa Rodriguez",
//       email: "l.rodriguez@foodprocessing.net",
//       company: "Quality Food Processing",
//       phone: "+1 (555) 234-5678",
//       inquiryType: "Service Contract",
//       message: "Interested in your annual maintenance plans for our existing equipment.",
//       createdAt: "2024-03-10T13:25:00Z"
//     },
//     {
//       id: 7,
//       name: "David Kim",
//       email: "david.kim@construction.com",
//       company: "Metro Construction",
//       phone: "-",
//       inquiryType: "Quote Request",
//       message: "Need pricing for 10 units of your industrial cooling towers (Model CT-5000).",
//       createdAt: "2024-03-09T08:40:00Z"
//     },
//     {
//       id: 8,
//       name: "Jennifer Lee",
//       email: "jennifer.lee@pharma.org",
//       company: "PharmaTech Solutions",
//       phone: "+1 (555) 345-6789",
//       inquiryType: "Technical Specifications",
//       message: "Requesting detailed technical specs and certifications for your sanitary separators.",
//       createdAt: "2024-03-08T15:50:00Z"
//     }
//   ];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Inquiry Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact,idx) => (
                <TableRow key={contact.id}>
                  <TableCell>{(idx+1)}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company || '-'}</TableCell>
                  <TableCell>{contact.phone || '-'}</TableCell>
                  <TableCell>{contact.inquiryType}</TableCell>
                  <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                  <TableCell>{new Date(contact.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {contacts.length === 0 && (
            <p className="text-center py-4">No contact queries found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}