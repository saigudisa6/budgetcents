import React from 'react';
import { Table, Text, Tooltip } from '@mantine/core';

interface Member {
  name: string;
  class: string;
  duesAmount: number;
  email: string;
  phone: string;
}

const outstandingDues: Member[] = [
  { name: 'John Doe', class: 'Alpha Epsilon', duesAmount: 250, email: 'john.doe@example.com', phone: '123-456-7890' },
  { name: 'Jane Smith', class: 'Alpha Beta', duesAmount: 200, email: 'jane.smith@example.com', phone: '987-654-3210' },
  { name: 'Alice Johnson', class: 'Alpha Omega', duesAmount: 100, email: 'alice.johnson@example.com', phone: '555-555-5555' },
];

const OutstandingDuesTable = () => {
  return (
    <div>
      <Text size="xl" tw={'500'} mb="md">Outstanding Dues</Text>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Name</th>
            <th style={{textAlign: 'left'}}>Pledge Class</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody style={{textAlign: 'left'}}>
          {outstandingDues.map((member, index) => (
            <Tooltip key={index} label={`Email: ${member.email}\nPhone: ${member.phone}`} withArrow position="right">
              <tr style={{ cursor: 'pointer' }}>
                <td>{member.name}</td>
                <td>{member.class}</td>
                <td style={{textAlign: 'center'}}>{member.duesAmount.toFixed(2)}</td>
              </tr>
            </Tooltip>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OutstandingDuesTable;