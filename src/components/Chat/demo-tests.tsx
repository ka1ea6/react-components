/**
 * Demo components for comprehensive testing of ChatInterface features
 * Including tool calling, markdown rendering, UI components, and edge cases
 */

import React, { useState } from 'react'
import { CopilotInterface } from './CopilotInterface'
import type { UIMessage } from 'ai'
import { testCapabilities } from '../../test-data/capabilities'

// Tool Calling Demo
export function ChatDemoToolCalling() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you help me analyze my sales data?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'I\'ll help you analyze your sales data. Let me fetch the latest information.\n\n*🔧 Calling function: fetch_sales_data(period="30d", region="all")*' 
        }
      ]
    },
    {
      id: '3',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Great! I\'ve retrieved your sales data for the last 30 days. Here\'s what I found:\n\n**Sales Summary:**\n- **Total Revenue:** $125,000\n- **Deals Closed:** 15\n- **Average Deal Size:** $8,333\n\n**Top Performers:**\n1. Alice Johnson\n2. Bob Smith\n3. Carol Davis\n\n*📊 Tool Result: Successfully retrieved 1,247 records from sales database*\n\nWould you like me to create a detailed report or analyze any specific metrics?' 
        }
      ]
    },
    {
      id: '4',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you create a chart showing the revenue trend?' }
      ]
    },
    {
      id: '5',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'I\'ll create a revenue trend chart for you.\n\n*🔧 Calling function: create_chart(type="line", data_source="sales_revenue", period="30d")*\n\n*📈 Tool Result: Chart generated successfully - ID: revenue-trend-123*\n\nPerfect! I\'ve created a revenue trend chart for the last 30 days. The chart shows your daily revenue performance with clear trend indicators:\n\n```\n📊 Revenue Trend - Last 30 Days\n   $6K ┤     ●\n   $5K ┤   ● │ ●   ●\n   $4K ┤ ● │ │ │ ● │ ●\n   $3K ┤ │ │ │ │ │ │ │ ●\n   $2K ┤ │ │ │ │ │ │ │ │\n   $1K ┤ │ │ │ │ │ │ │ │\n     0 └─┴─┴─┴─┴─┴─┴─┴─\n       1 2 3 4 5 6 7 8... (days)\n```\n\n**Key Insights:**\n- Peak revenue on Day 5: $5,500\n- Lowest revenue on Day 6: $3,200\n- Average daily revenue: $4,443\n- Overall trend: **Positive growth** (+12% from start to end)' 
        }
      ]
    },
    {
      id: '6',
      role: 'user',
      parts: [
        { type: 'text', text: 'What about error handling? Try calling a function that doesn\'t exist.' }
      ]
    },
    {
      id: '7',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'I\'ll demonstrate error handling by calling a non-existent function.\n\n*🔧 Calling function: non_existent_function(param="test")*\n\n❌ **Function Call Error**\n```\nError: Function \'non_existent_function\' not found\nCode: FUNCTION_NOT_FOUND\nTimestamp: 2024-01-20T10:30:45Z\n```\n\n**Error Handling:**\n- ✅ Error caught and handled gracefully\n- ✅ User-friendly error message displayed\n- ✅ System remains stable and responsive\n- ✅ Fallback options available\n\n**Available Functions:**\n- `fetch_sales_data` - Retrieve sales information\n- `create_chart` - Generate visualizations\n- `analyze_data` - Perform data analysis\n- `generate_report` - Create reports\n\nWould you like me to try a valid function instead?' 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Markdown and Rich Text Demo
export function ChatDemoMarkdownResponses() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me some examples of markdown formatting?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Markdown Formatting Examples

Here are various markdown elements that should render properly in the chat:

## Headers and Text Formatting

**Bold text** and *italic text* and ***bold italic text***

~~Strikethrough text~~

\`Inline code\` and regular text.

## Code Blocks

Here's a JavaScript function:

\`\`\`javascript
function calculateRevenue(deals) {
  return deals.reduce((total, deal) => {
    return total + deal.amount;
  }, 0);
}

const deals = [
  { id: 1, amount: 5000, status: 'closed' },
  { id: 2, amount: 3500, status: 'pending' },
  { id: 3, amount: 7200, status: 'closed' }
];

console.log('Total Revenue:', calculateRevenue(deals));
\`\`\`

## Lists

### Unordered List:
- Project management features
- Real-time collaboration
- Advanced analytics
  - Revenue tracking
  - Performance metrics
  - Custom dashboards

### Ordered List:
1. **Setup** - Configure your workspace
2. **Import** - Upload your data
3. **Analyze** - Review insights
4. **Action** - Implement changes

## Tables

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users | 5 | 50 | Unlimited |
| Storage | 1GB | 100GB | 1TB |
| Support | Email | Priority | 24/7 |
| Price | $0 | $29/mo | $99/mo |

## Links and Images

Visit our [documentation](https://docs.example.com) for more details.

## Blockquotes

> "The best way to predict the future is to create it."
> 
> — Peter Drucker

## Horizontal Rule

---

That covers the main markdown elements! They should all render properly in the chat interface.` 
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me a complex code example with syntax highlighting?' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Complex Code Examples

Here are some advanced code examples with different languages:

## React Component with TypeScript

\`\`\`typescript
import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

interface UserListProps {
  initialUsers?: User[];
  onUserSelect: (user: User) => void;
  filterByRole?: User['role'];
}

const UserList: React.FC<UserListProps> = ({ 
  initialUsers = [], 
  onUserSelect, 
  filterByRole 
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const userData: User[] = await response.json();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialUsers.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, initialUsers.length]);

  const filteredUsers = filterByRole 
    ? users.filter(user => user.role === filterByRole)
    : users;

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      {filteredUsers.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={() => onUserSelect(user)}
        />
      ))}
    </div>
  );
};

export default UserList;
\`\`\`

## Python Data Analysis

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns

class SalesAnalyzer:
    def __init__(self, data_path: str):
        self.data = pd.read_csv(data_path)
        self.prepare_data()
    
    def prepare_data(self):
        """Clean and prepare the sales data for analysis."""
        # Convert date columns
        self.data['date'] = pd.to_datetime(self.data['date'])
        self.data['month'] = self.data['date'].dt.to_period('M')
        
        # Handle missing values
        self.data['revenue'].fillna(0, inplace=True)
        self.data['customer_id'].fillna('unknown', inplace=True)
        
        # Create derived metrics
        self.data['revenue_category'] = pd.cut(
            self.data['revenue'], 
            bins=[0, 1000, 5000, 10000, float('inf')],
            labels=['Small', 'Medium', 'Large', 'Enterprise']
        )
    
    def monthly_trends(self) -> pd.DataFrame:
        """Calculate monthly revenue trends."""
        monthly_data = self.data.groupby('month').agg({
            'revenue': ['sum', 'mean', 'count'],
            'customer_id': 'nunique'
        }).round(2)
        
        monthly_data.columns = [
            'total_revenue', 'avg_deal_size', 
            'deal_count', 'unique_customers'
        ]
        
        # Calculate growth rates
        monthly_data['revenue_growth'] = (
            monthly_data['total_revenue']
            .pct_change() * 100
        ).round(2)
        
        return monthly_data
    
    def visualize_trends(self, save_path: str = None):
        """Create visualizations of sales trends."""
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        
        # Monthly revenue trend
        monthly = self.monthly_trends()
        axes[0, 0].plot(monthly.index.astype(str), monthly['total_revenue'])
        axes[0, 0].set_title('Monthly Revenue Trend')
        
        plt.tight_layout()
        return fig

# Usage example
if __name__ == "__main__":
    analyzer = SalesAnalyzer('sales_data.csv')
    trends = analyzer.monthly_trends()
    print("Monthly Trends:")
    print(trends)
\`\`\`

This demonstrates complex syntax highlighting with multiple languages and should render properly with appropriate color coding!` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// UI Components Demo
export function ChatDemoUIComponents() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me some interactive dashboard components?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `I'll create some interactive dashboard components for you. Here are various UI elements:

## 📊 Sales Dashboard

### Key Metrics
- **Total Revenue:** $125,000 (+12.5% ↗️)
- **New Customers:** 47 (+8.3% ↗️)
- **Conversion Rate:** 3.2% (-2.1% ↘️)
- **Average Deal Size:** $8,333 (+5.7% ↗️)

### Customer Overview
| Customer | Company | Revenue | Status | Last Contact |
|----------|---------|---------|--------|-------------|
| Alice Johnson | Acme Corp | $85,000 | 🟢 Active | 2024-01-15 |
| Bob Smith | Beta Inc | $45,000 | 🟡 Pending | 2024-01-12 |
| Carol Davis | Gamma LLC | $15,000 | 🔴 Inactive | 2024-01-08 |
| David Wilson | Delta Systems | $125,000 | 🟢 Active | 2024-01-18 |

### Project Progress
**Website Redesign Project** - 65% Complete

- ✅ Discovery & Planning (100%)
- ✅ Design & Prototyping (100%)
- 🔄 Development (75% - In Progress)
  - ✅ Frontend development
  - 🔄 Backend integration
  - ⏳ Testing & QA
- ⏳ Launch & Deployment (0% - Pending)

### Revenue Trend
\`\`\`
Jan  ████████████████████ $52K
Feb  ███████████████████████ $58K  
Mar  ██████████████████████████ $65K
Apr  ████████████████████████████ $71K
May  ██████████████████████████████ $75K
\`\`\`

These components demonstrate how the chat interface can display rich, interactive data visualizations and structured information.` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// File Upload Demo
export function ChatDemoFileUploads() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'I want to upload some files for analysis' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Perfect! I can help you analyze various file types. You can upload:\n\n📊 **Data Files:**\n- CSV/Excel spreadsheets\n- JSON data files\n- Database exports\n\n📄 **Documents:**\n- PDF reports\n- Word documents\n- Text files\n\n🖼️ **Media Files:**\n- Images (PNG, JPG, GIF)\n- Charts and diagrams\n\n**File Upload Features:**\n- ✅ Drag & drop support\n- ✅ Multiple file selection\n- ✅ Progress indicators\n- ✅ File type validation\n- ✅ Size limit checking (max 10MB)\n\nTry uploading some files using the attachment button below!' 
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'I uploaded sales_data.csv and quarterly_report.pdf' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `Great! I can see you've uploaded two files:

## 📁 Uploaded Files

### 1. 📊 sales_data.csv (15.4 KB)
- **Type:** CSV Spreadsheet
- **Status:** ✅ Successfully uploaded
- **Preview:** Contains sales transaction data
- **Columns:** Date, Customer, Product, Revenue, Region

### 2. 📄 quarterly_report.pdf (2.6 MB)
- **Type:** PDF Document  
- **Status:** ✅ Successfully uploaded
- **Pages:** 24 pages
- **Content:** Q4 2023 Business Report

## 🔍 Analysis Results

**CSV Data Summary:**
- **Total Records:** 1,247 sales transactions
- **Date Range:** January 1, 2023 - December 31, 2023
- **Total Revenue:** $1,250,000
- **Average Deal Size:** $1,002.40

**PDF Report Highlights:**
- **Q4 Revenue:** $485,000 (from report)
- **Annual Growth:** 15.2%
- **Top Region:** North America
- **Key Sections:** Executive Summary, Financial Performance, Sales Analysis

## 🔍 Data Comparison
- **Variance Found:** $70,000 difference between CSV total ($1,250,000) and PDF annual total ($1,180,000)
- **Recommendation:** Investigate timing differences or adjustments

Would you like me to:
- 📊 Create detailed visualizations
- 🔍 Investigate the revenue variance
- 📈 Generate trend analysis
- 📋 Create a unified report?`
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Error Handling Demo
export function ChatDemoErrorHandling() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you fetch my latest sales data?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `I'll fetch your latest sales data right away.

*🔧 Calling function: fetch_sales_data(period="latest")*

⚠️ **Database Connection Timeout**

\`\`\`
Error: Database connection timeout
Code: DB_TIMEOUT
Retry after: 30 seconds
Timestamp: 2024-01-20T10:15:23Z
\`\`\`

This is usually a temporary issue. I'll retry the request in 30 seconds. In the meantime, you can:

1. Check if there are any ongoing system maintenance notifications
2. Try refreshing the page
3. Contact support if the issue persists

Would you like me to try again now or wait for the suggested retry time?` 
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'Please try again now' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `Retrying the sales data fetch...

*🔧 Calling function: fetch_sales_data(period="latest", retry=true)*

🚫 **Access Denied**

\`\`\`
Error: Insufficient permissions
Code: AUTH_ERROR
Required permissions: ['sales:read', 'data:access']
Contact admin: true
\`\`\`

I'm unable to fetch the sales data due to insufficient permissions.

**Required Permissions:**
- \`sales:read\` - Read access to sales data
- \`data:access\` - General data access rights

**Next Steps:**
1. **Contact your administrator** to request the necessary permissions
2. **Verify your role** - You may need a sales or data analyst role
3. **Check group memberships** - Ensure you're in the appropriate security groups

**Alternative Options:**
- Upload a sales data file directly (CSV, Excel)
- Request data from a colleague with appropriate access
- Use the capabilities menu to explore other available features

Would you like to try uploading a file instead, or explore other features I can help you with?` 
        }
      ]
    },
    {
      id: '5',
      role: 'user',
      parts: [
        { type: 'text', text: 'What about creating a report with invalid data?' }
      ]
    },
    {
      id: '6',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `I'll attempt to create a report with the data available.

*🔧 Calling function: generate_report(data_source="invalid_source", report_type="sales_summary")*

❌ **Invalid Data Source**

\`\`\`
Error: Invalid data source specified
Code: INVALID_SOURCE
Valid sources: ['sales_db', 'crm_system', 'uploaded_files']
Suggestion: Please specify a valid data source
\`\`\`

The report generation failed because the specified data source is not valid.

**Available Data Sources:**
- \`sales_db\` - Main sales database
- \`crm_system\` - Customer relationship management system
- \`uploaded_files\` - Files you've uploaded to the chat

**How to Fix This:**
1. **Choose a valid source** from the list above
2. **Upload data files** if you want to use your own data
3. **Check data permissions** for database sources

**Example:** "Generate a sales report using the CRM system data"

Would you like me to try generating a report with one of the valid data sources?` 
        }
      ]
    },
    {
      id: '7',
      role: 'user',
      parts: [
        { type: 'text', text: 'Let me try uploading some corrupted data' }
      ]
    },
    {
      id: '8',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `I see you're trying to upload a file. Let me analyze it.

*🔧 Processing file: corrupted_data.xlsx*

💾 **Corrupted or Empty File**

\`\`\`
Error: File appears to be corrupted or empty
Code: CORRUPTED_FILE
File size: 0 bytes
MIME type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
\`\`\`

The uploaded Excel file appears to be corrupted or empty (0 bytes).

**Possible Causes:**
- File upload was interrupted
- Original file is corrupted
- File format is not supported
- Network issues during upload

**Troubleshooting Steps:**

1. **Re-save the file:**
   - Open in Excel and save as a new file
   - Try "Save As" → Excel Workbook (.xlsx)

2. **Try different format:**
   - Export as CSV (.csv) for better compatibility
   - Save as Excel 97-2003 (.xls) if needed

3. **Check file integrity:**
   - Verify you can open the file locally
   - Check file size (should be > 0 bytes)

4. **Re-upload:**
   - Clear browser cache
   - Try uploading again

**Alternative Solutions:**
- Copy data into a new spreadsheet
- Use Google Sheets and export as Excel
- Upload as a text/CSV file instead

Would you like to try uploading the file again or in a different format?` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Capabilities Interaction Demo
export function ChatDemoCapabilitiesInteraction() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `Welcome! I can help you with various business tasks. Use the capabilities menu at the bottom to explore what I can do, or ask me directly about:

🏢 **Sales & CRM**
- Customer management
- Sales pipeline tracking
- Revenue analysis

📊 **Marketing**
- Campaign management
- Analytics and reporting
- Lead generation

👥 **HR & Operations**
- Employee management
- Project tracking
- Document processing

💰 **Finance**
- Financial reporting
- Budget analysis
- Expense tracking

Try clicking on any capability in the menu below to get started!` 
        }
      ]
    },
    {
      id: '2',
      role: 'user',
      parts: [
        { type: 'text', text: 'I clicked on Sales → Customers → Acme Corp' }
      ]
    },
    {
      id: '3',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `Great! You've selected **Acme Corp** from the customers list. Here's what I found:

## 🏢 Acme Corp - Customer Profile

### 📋 Basic Information
- **Company:** Acme Corp
- **Type:** Enterprise Customer
- **Revenue:** $125,000 ARR
- **Industry:** Technology
- **Employees:** 500
- **Status:** 🟢 Active
- **Last Contact:** January 15, 2024

### 👥 Key Contacts
| Name | Role | Email |
|------|------|-------|
| John Smith | CTO | john@acme.com |
| Sarah Johnson | Procurement | sarah@acme.com |

### 📈 Recent Activity
- **Jan 15:** Contract renewal discussion
- **Jan 10:** Product demo scheduled
- **Jan 05:** Support ticket resolved

### 🎯 Current Opportunities
- **Enterprise License Renewal** - $150K (Negotiation stage)
- **Additional Modules** - $25K (Proposal stage)

**Available Actions for Acme Corp:**

🎯 **Sales Actions**
- Schedule follow-up meeting
- Update opportunity status
- Send contract renewal proposal

📞 **Communication**
- Log customer call
- Send email update
- Schedule product demo

📊 **Analytics**
- View customer health score
- Generate account report
- Analyze usage patterns

What would you like to do next?` 
        }
      ]
    },
    {
      id: '4',
      role: 'user',
      parts: [
        { type: 'text', text: 'Now I want to explore Marketing → Campaign Management' }
      ]
    },
    {
      id: '5',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `Perfect! You've navigated to **Campaign Management**. Here's an overview of your marketing campaigns:

## 📈 Active Marketing Campaigns

### Campaign Performance Dashboard

| Campaign | Type | Status | Budget | Spent | Leads | Conv. | ROI |
|----------|------|--------|--------|-------|-------|-------|-----|
| Winter Promotion 2024 | Email + Social | 🟢 Active | $15K | $8.5K | 247 | 23 | 180% |
| New Product Launch | Multi-channel | 🟡 Planning | $25K | $0 | 0 | 0 | TBD |
| Retargeting Campaign | Digital Ads | 🟢 Active | $8K | $3.2K | 89 | 12 | 150% |

### 📊 Performance Insights

**Winter Promotion 2024** (Best Performer)
- Launch Date: Jan 1, 2024
- Duration: 59 days remaining
- Conversion Rate: 9.3%
- Cost per Lead: $34.41
- Average Deal Size: $3,261

**Campaign Management Actions:**

📝 **Create & Edit**
- Create new campaign
- Duplicate existing campaign
- Edit campaign settings

📊 **Analytics & Reporting**
- View detailed performance
- Generate ROI report
- Compare campaign metrics

⚙️ **Management**
- Pause/resume campaigns
- Adjust budgets
- Update target audiences

🎯 **Optimization**
- A/B test variations
- Optimize targeting
- Adjust bidding strategies

Which campaign would you like to work with, or what action would you like to take?` 
        }
      ]
    },
    {
      id: '6',
      role: 'user',
      parts: [
        { type: 'text', text: 'Let me check HR → Employee Management → Performance Reviews' }
      ]
    },
    {
      id: '7',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `You've accessed **Performance Reviews** in HR. Here's the current status of performance reviews:

## 👥 Performance Review Dashboard - Q4 2023

### 📊 Overview
- **Total Employees:** 127
- **Reviews Completed:** 89 (70.1%)
- **Reviews Pending:** 23 (18.1%)
- **Reviews Overdue:** 15 (11.8%)

### 🏢 Department Breakdown

| Department | Employees | Completed | Pending | Overdue | Avg Rating |
|------------|-----------|-----------|---------|---------|------------|
| Engineering | 45 | 38 | 5 | 2 | ⭐ 4.2/5 |
| Sales | 28 | 22 | 4 | 2 | ⭐ 3.9/5 |
| Marketing | 18 | 12 | 3 | 3 | ⭐ 4.0/5 |
| Operations | 15 | 9 | 4 | 2 | ⭐ 3.8/5 |

### ⚠️ Upcoming Deadlines (This Week)
- **Alex Chen** (Engineering) - Due Jan 25
- **Maria Garcia** (Sales) - Due Jan 27  
- **David Kim** (Marketing) - Due Jan 30

**Performance Review Actions:**

✅ **Review Management**
- Schedule new reviews
- Send completion reminders
- Mark reviews as complete

📋 **Templates & Forms**
- Create review templates
- Customize evaluation forms
- Set review criteria

📊 **Analytics & Reports**
- Generate department reports
- Track completion rates
- Analyze performance trends

🔔 **Notifications**
- Send deadline reminders
- Notify managers of overdue reviews
- Schedule follow-up meetings

**⚠️ Attention Required:**
- 15 reviews are **overdue**
- 23 reviews are **pending**
- 3 employees have upcoming deadlines this week

Would you like me to send reminder notifications or help with any specific review tasks?` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Markdown and Rich Text Demo
export function ChatDemoMarkdownResponses() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me some examples of markdown formatting?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Markdown Formatting Examples

Here are various markdown elements that should render properly in the chat:

## Headers and Text Formatting

**Bold text** and *italic text* and ***bold italic text***

~~Strikethrough text~~

\`Inline code\` and regular text.

## Code Blocks

Here's a JavaScript function:

\`\`\`javascript
function calculateRevenue(deals) {
  return deals.reduce((total, deal) => {
    return total + deal.amount;
  }, 0);
}

const deals = [
  { id: 1, amount: 5000, status: 'closed' },
  { id: 2, amount: 3500, status: 'pending' },
  { id: 3, amount: 7200, status: 'closed' }
];

console.log('Total Revenue:', calculateRevenue(deals));
\`\`\`

## Lists

### Unordered List:
- Project management features
- Real-time collaboration
- Advanced analytics
  - Revenue tracking
  - Performance metrics
  - Custom dashboards

### Ordered List:
1. **Setup** - Configure your workspace
2. **Import** - Upload your data
3. **Analyze** - Review insights
4. **Action** - Implement changes

## Tables

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users | 5 | 50 | Unlimited |
| Storage | 1GB | 100GB | 1TB |
| Support | Email | Priority | 24/7 |
| Price | $0 | $29/mo | $99/mo |

## Links and Images

Visit our [documentation](https://docs.example.com) for more details.

## Blockquotes

> "The best way to predict the future is to create it."
> 
> — Peter Drucker

## Horizontal Rule

---

That covers the main markdown elements! They should all render properly in the chat interface.` 
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me a complex code example with syntax highlighting?' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Complex Code Examples

Here are some advanced code examples with different languages:

## React Component with TypeScript

\`\`\`typescript
import React, { useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
}

interface UserListProps {
  initialUsers?: User[];
  onUserSelect: (user: User) => void;
  filterByRole?: User['role'];
}

const UserList: React.FC<UserListProps> = ({ 
  initialUsers = [], 
  onUserSelect, 
  filterByRole 
}) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const userData: User[] = await response.json();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialUsers.length === 0) {
      fetchUsers();
    }
  }, [fetchUsers, initialUsers.length]);

  const filteredUsers = filterByRole 
    ? users.filter(user => user.role === filterByRole)
    : users;

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      {filteredUsers.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          onClick={() => onUserSelect(user)}
        />
      ))}
    </div>
  );
};

export default UserList;
\`\`\`

## Python Data Analysis

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import seaborn as sns

class SalesAnalyzer:
    def __init__(self, data_path: str):
        self.data = pd.read_csv(data_path)
        self.prepare_data()
    
    def prepare_data(self):
        """Clean and prepare the sales data for analysis."""
        # Convert date columns
        self.data['date'] = pd.to_datetime(self.data['date'])
        self.data['month'] = self.data['date'].dt.to_period('M')
        
        # Handle missing values
        self.data['revenue'].fillna(0, inplace=True)
        self.data['customer_id'].fillna('unknown', inplace=True)
        
        # Create derived metrics
        self.data['revenue_category'] = pd.cut(
            self.data['revenue'], 
            bins=[0, 1000, 5000, 10000, float('inf')],
            labels=['Small', 'Medium', 'Large', 'Enterprise']
        )
    
    def monthly_trends(self) -> pd.DataFrame:
        """Calculate monthly revenue trends."""
        monthly_data = self.data.groupby('month').agg({
            'revenue': ['sum', 'mean', 'count'],
            'customer_id': 'nunique'
        }).round(2)
        
        monthly_data.columns = [
            'total_revenue', 'avg_deal_size', 
            'deal_count', 'unique_customers'
        ]
        
        # Calculate growth rates
        monthly_data['revenue_growth'] = (
            monthly_data['total_revenue']
            .pct_change() * 100
        ).round(2)
        
        return monthly_data
    
    def top_customers(self, n: int = 10) -> pd.DataFrame:
        """Find top customers by revenue."""
        return (
            self.data.groupby('customer_id')['revenue']
            .sum()
            .sort_values(ascending=False)
            .head(n)
            .reset_index()
        )
    
    def visualize_trends(self, save_path: str = None):
        """Create visualizations of sales trends."""
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        
        # Monthly revenue trend
        monthly = self.monthly_trends()
        axes[0, 0].plot(monthly.index.astype(str), monthly['total_revenue'])
        axes[0, 0].set_title('Monthly Revenue Trend')
        axes[0, 0].tick_params(axis='x', rotation=45)
        
        # Revenue distribution
        axes[0, 1].hist(self.data['revenue'], bins=30, alpha=0.7)
        axes[0, 1].set_title('Revenue Distribution')
        
        # Customer segments
        segment_counts = self.data['revenue_category'].value_counts()
        axes[1, 0].pie(segment_counts.values, labels=segment_counts.index, autopct='%1.1f%%')
        axes[1, 0].set_title('Customer Segments')
        
        # Top customers
        top_customers = self.top_customers()
        axes[1, 1].barh(top_customers['customer_id'][::-1], top_customers['revenue'][::-1])
        axes[1, 1].set_title('Top 10 Customers by Revenue')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
        
        return fig

# Usage example
if __name__ == "__main__":
    analyzer = SalesAnalyzer('sales_data.csv')
    
    # Generate insights
    trends = analyzer.monthly_trends()
    print("Monthly Trends:")
    print(trends)
    
    top_customers = analyzer.top_customers()
    print("\\nTop Customers:")
    print(top_customers)
    
    # Create visualizations
    analyzer.visualize_trends('sales_analysis.png')
\`\`\`

This demonstrates complex syntax highlighting with multiple languages and should render properly with appropriate color coding!` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// UI Components Demo
export function ChatDemoUIComponents() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me some interactive dashboard components?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'I\'ll create some interactive dashboard components for you. Here are various UI elements:' 
        },
        {
          type: 'data-dashboard',
          data: {
            title: 'Sales Dashboard',
            widgets: [
              {
                type: 'metric',
                title: 'Total Revenue',
                value: '$125,000',
                change: '+12.5%',
                trend: 'up'
              },
              {
                type: 'metric',
                title: 'New Customers',
                value: '47',
                change: '+8.3%',
                trend: 'up'
              },
              {
                type: 'metric',
                title: 'Conversion Rate',
                value: '3.2%',
                change: '-2.1%',
                trend: 'down'
              }
            ]
          }
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you show me a data table with customer information?' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Here\'s a customer data table with sorting and filtering capabilities:' 
        },
        {
          type: 'data-table',
          data: {
            title: 'Customer Information',
            columns: [
              { key: 'name', label: 'Customer Name', sortable: true },
              { key: 'company', label: 'Company', sortable: true },
              { key: 'revenue', label: 'Revenue', sortable: true, type: 'currency' },
              { key: 'status', label: 'Status', type: 'badge' },
              { key: 'lastContact', label: 'Last Contact', type: 'date' }
            ],
            rows: [
              {
                id: '1',
                name: 'Alice Johnson',
                company: 'Acme Corp',
                revenue: 85000,
                status: 'active',
                lastContact: '2024-01-15'
              },
              {
                id: '2',
                name: 'Bob Smith',
                company: 'Beta Inc',
                revenue: 45000,
                status: 'pending',
                lastContact: '2024-01-12'
              },
              {
                id: '3',
                name: 'Carol Davis',
                company: 'Gamma LLC',
                revenue: 15000,
                status: 'inactive',
                lastContact: '2024-01-08'
              },
              {
                id: '4',
                name: 'David Wilson',
                company: 'Delta Systems',
                revenue: 125000,
                status: 'active',
                lastContact: '2024-01-18'
              }
            ]
          }
        }
      ]
    },
    {
      id: '5',
      role: 'user',
      parts: [
        { type: 'text', text: 'Show me a progress tracker for a project' }
      ]
    },
    {
      id: '6',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Here\'s a project progress tracker with timeline and milestones:' 
        },
        {
          type: 'data-progress',
          data: {
            title: 'Website Redesign Project',
            overall_progress: 65,
            phases: [
              {
                name: 'Discovery & Planning',
                status: 'completed',
                progress: 100,
                start_date: '2024-01-01',
                end_date: '2024-01-15',
                tasks: [
                  { name: 'Stakeholder interviews', completed: true },
                  { name: 'Requirements gathering', completed: true },
                  { name: 'Project timeline', completed: true }
                ]
              },
              {
                name: 'Design & Prototyping',
                status: 'completed',
                progress: 100,
                start_date: '2024-01-16',
                end_date: '2024-02-15',
                tasks: [
                  { name: 'Wireframes', completed: true },
                  { name: 'Visual design', completed: true },
                  { name: 'Interactive prototype', completed: true }
                ]
              },
              {
                name: 'Development',
                status: 'in_progress',
                progress: 75,
                start_date: '2024-02-16',
                end_date: '2024-03-30',
                tasks: [
                  { name: 'Frontend development', completed: true },
                  { name: 'Backend integration', completed: false },
                  { name: 'Testing & QA', completed: false }
                ]
              },
              {
                name: 'Launch & Deployment',
                status: 'pending',
                progress: 0,
                start_date: '2024-03-31',
                end_date: '2024-04-15',
                tasks: [
                  { name: 'Production deployment', completed: false },
                  { name: 'User training', completed: false },
                  { name: 'Go-live support', completed: false }
                ]
              }
            ]
          }
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// File Upload Demo
export function ChatDemoFileUploads() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'I want to upload some files for analysis' },
        {
          type: 'file',
          file: {
            name: 'sales_data.csv',
            size: 15420,
            type: 'text/csv',
            lastModified: Date.now()
          } as File,
          url: '/uploads/sales_data.csv'
        },
        {
          type: 'file',
          file: {
            name: 'quarterly_report.pdf',
            size: 2580000,
            type: 'application/pdf',
            lastModified: Date.now()
          } as File,
          url: '/uploads/quarterly_report.pdf'
        }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Great! I can see you\'ve uploaded two files:\n\n1. **sales_data.csv** (15.4 KB) - CSV spreadsheet\n2. **quarterly_report.pdf** (2.6 MB) - PDF document\n\nI can help you analyze this data. What would you like me to do with these files?' 
        }
      ]
    },
    {
      id: '3',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you analyze the CSV and summarize the key findings?' }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'I\'ll analyze the sales data CSV file for you.' },
        {
          type: 'tool-call',
          toolCallId: 'call_1',
          toolName: 'analyze_csv',
          args: { 
            file_path: '/uploads/sales_data.csv',
            analysis_type: 'summary_statistics'
          }
        }
      ]
    },
    {
      id: '5',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_1',
          toolName: 'analyze_csv',
          result: {
            rows: 1247,
            columns: 8,
            date_range: '2023-01-01 to 2023-12-31',
            total_revenue: 1250000,
            avg_deal_size: 1002.40,
            columns_info: {
              date: 'Date of sale',
              customer_id: 'Customer identifier',
              customer_name: 'Customer name',
              product: 'Product sold',
              revenue: 'Sale amount',
              region: 'Sales region',
              sales_rep: 'Sales representative',
              deal_stage: 'Current deal stage'
            }
          }
        }
      ]
    },
    {
      id: '6',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Sales Data Analysis Summary

I've analyzed your sales data CSV file. Here are the key findings:

## Dataset Overview
- **Total Records:** 1,247 sales transactions
- **Time Period:** January 1, 2023 - December 31, 2023
- **Data Columns:** 8 fields including customer info, product details, and revenue

## Financial Summary
- **Total Revenue:** $1,250,000
- **Average Deal Size:** $1,002.40
- **Revenue Range:** Full year 2023 performance

## Data Structure
The CSV contains these key fields:
- **Date:** Sale transaction dates
- **Customer Info:** ID and name
- **Product:** Items sold
- **Revenue:** Transaction amounts
- **Region:** Sales territories
- **Sales Rep:** Account managers
- **Deal Stage:** Transaction status

Would you like me to dive deeper into any specific aspect of this data, such as:
- Regional performance comparison
- Top-performing sales representatives
- Product category analysis
- Monthly/quarterly trends
- Customer segmentation analysis?` 
        }
      ]
    },
    {
      id: '7',
      role: 'user',
      parts: [
        { type: 'text', text: 'Now analyze the PDF report and compare it with the CSV data' }
      ]
    },
    {
      id: '8',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'I\'ll extract and analyze the PDF report to compare with the CSV data.' },
        {
          type: 'tool-call',
          toolCallId: 'call_2',
          toolName: 'extract_pdf_content',
          args: { 
            file_path: '/uploads/quarterly_report.pdf',
            extract_tables: true,
            extract_charts: true
          }
        }
      ]
    },
    {
      id: '9',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_2',
          toolName: 'extract_pdf_content',
          result: {
            title: 'Q4 2023 Quarterly Business Report',
            pages: 24,
            sections: [
              'Executive Summary',
              'Financial Performance',
              'Sales Analysis',
              'Regional Breakdown',
              'Product Performance',
              'Future Outlook'
            ],
            key_metrics: {
              q4_revenue: 485000,
              annual_revenue: 1180000,
              q4_deals: 312,
              top_region: 'North America',
              growth_rate: '15.2%'
            },
            tables_found: 6,
            charts_found: 8
          }
        }
      ]
    },
    {
      id: '10',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: `# Comparative Analysis: CSV Data vs PDF Report

I've analyzed both files and found some interesting insights:

## Data Comparison

### Revenue Figures
- **CSV Data Total:** $1,250,000 (full year)
- **PDF Report Total:** $1,180,000 (reported annual)
- **Difference:** $70,000 variance (5.9% higher in CSV)

### Q4 2023 Performance
- **PDF Q4 Revenue:** $485,000
- **CSV Q4 Deals:** 312 transactions (from PDF)
- **Average Q4 Deal Size:** ~$1,554 (calculated)

## Key Findings

### ✅ Consistent Areas
- Both sources show strong performance in North America region
- Deal volume aligns between datasets
- Growth trajectory matches expectations

### ⚠️ Discrepancies to Investigate
1. **Revenue Variance:** $70K difference in annual totals
   - Could be due to timing differences
   - Possible adjustments or refunds
   - Different reporting periods

2. **Data Completeness:** CSV has more granular transaction data
3. **Regional Performance:** Need to cross-reference regional breakdowns

## Recommendations
1. **Reconcile Revenue:** Investigate the $70K variance
2. **Data Integration:** Use CSV granular data to validate PDF summaries
3. **Regional Deep Dive:** Leverage CSV data for detailed regional analysis
4. **Trend Analysis:** Use CSV timestamps for precise trend analysis

Would you like me to:
- Investigate specific discrepancies?
- Create a unified dashboard combining both datasets?
- Generate detailed regional or product analysis?` 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Error Handling Demo
export function ChatDemoErrorHandling() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'user',
      parts: [
        { type: 'text', text: 'Can you fetch my latest sales data?' }
      ]
    },
    {
      id: '2',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'I\'ll fetch your latest sales data right away.' },
        {
          type: 'tool-call',
          toolCallId: 'call_1',
          toolName: 'fetch_sales_data',
          args: { period: 'latest' }
        }
      ]
    },
    {
      id: '3',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_1',
          toolName: 'fetch_sales_data',
          result: {
            error: 'Database connection timeout',
            error_code: 'DB_TIMEOUT',
            retry_after: 30
          }
        }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '⚠️ I encountered an issue while fetching your sales data:\n\n**Error:** Database connection timeout\n**Error Code:** DB_TIMEOUT\n\nThis is usually a temporary issue. I\'ll retry the request in 30 seconds. In the meantime, you can:\n\n1. Check if there are any ongoing system maintenance notifications\n2. Try refreshing the page\n3. Contact support if the issue persists\n\nWould you like me to try again now or wait for the suggested retry time?' 
        }
      ]
    },
    {
      id: '5',
      role: 'user',
      parts: [
        { type: 'text', text: 'Please try again now' }
      ]
    },
    {
      id: '6',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'Retrying the sales data fetch...' },
        {
          type: 'tool-call',
          toolCallId: 'call_2',
          toolName: 'fetch_sales_data',
          args: { period: 'latest', retry: true }
        }
      ]
    },
    {
      id: '7',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_2',
          toolName: 'fetch_sales_data',
          result: {
            error: 'Insufficient permissions',
            error_code: 'AUTH_ERROR',
            required_permissions: ['sales:read', 'data:access'],
            contact_admin: true
          }
        }
      ]
    },
    {
      id: '8',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '🚫 **Access Denied**\n\nI\'m unable to fetch the sales data due to insufficient permissions.\n\n**Required Permissions:**\n- `sales:read` - Read access to sales data\n- `data:access` - General data access rights\n\n**Next Steps:**\n1. **Contact your administrator** to request the necessary permissions\n2. **Verify your role** - You may need a sales or data analyst role\n3. **Check group memberships** - Ensure you\'re in the appropriate security groups\n\n**Alternative Options:**\n- Upload a sales data file directly (CSV, Excel)\n- Request data from a colleague with appropriate access\n- Use the capabilities menu to explore other available features\n\nWould you like to try uploading a file instead, or explore other features I can help you with?' 
        }
      ]
    },
    {
      id: '9',
      role: 'user',
      parts: [
        { type: 'text', text: 'What about creating a report with invalid data?' }
      ]
    },
    {
      id: '10',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'I\'ll attempt to create a report with the data available.' },
        {
          type: 'tool-call',
          toolCallId: 'call_3',
          toolName: 'generate_report',
          args: { 
            data_source: 'invalid_source',
            report_type: 'sales_summary'
          }
        }
      ]
    },
    {
      id: '11',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_3',
          toolName: 'generate_report',
          result: {
            error: 'Invalid data source specified',
            error_code: 'INVALID_SOURCE',
            valid_sources: ['sales_db', 'crm_system', 'uploaded_files'],
            suggestion: 'Please specify a valid data source'
          }
        }
      ]
    },
    {
      id: '12',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '❌ **Invalid Data Source**\n\nThe report generation failed because the specified data source is not valid.\n\n**Available Data Sources:**\n- `sales_db` - Main sales database\n- `crm_system` - Customer relationship management system\n- `uploaded_files` - Files you\'ve uploaded to the chat\n\n**How to Fix This:**\n1. **Choose a valid source** from the list above\n2. **Upload data files** if you want to use your own data\n3. **Check data permissions** for database sources\n\n**Example:** "Generate a sales report using the CRM system data"\n\nWould you like me to try generating a report with one of the valid data sources?' 
        }
      ]
    },
    {
      id: '13',
      role: 'user',
      parts: [
        { type: 'text', text: 'Let me try uploading some corrupted data' },
        {
          type: 'file',
          file: {
            name: 'corrupted_data.xlsx',
            size: 0,
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            lastModified: Date.now()
          } as File,
          url: '/uploads/corrupted_data.xlsx'
        }
      ]
    },
    {
      id: '14',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'I\'ll analyze the uploaded Excel file.' },
        {
          type: 'tool-call',
          toolCallId: 'call_4',
          toolName: 'analyze_excel',
          args: { file_path: '/uploads/corrupted_data.xlsx' }
        }
      ]
    },
    {
      id: '15',
      role: 'tool',
      parts: [
        {
          type: 'tool-result',
          toolCallId: 'call_4',
          toolName: 'analyze_excel',
          result: {
            error: 'File appears to be corrupted or empty',
            error_code: 'CORRUPTED_FILE',
            file_size: 0,
            suggestions: [
              'Try re-saving the file in Excel',
              'Export as CSV format instead',
              'Check if the file was fully uploaded'
            ]
          }
        }
      ]
    },
    {
      id: '16',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '💾 **Corrupted or Empty File**\n\nThe uploaded Excel file appears to be corrupted or empty (0 bytes).\n\n**Possible Causes:**\n- File upload was interrupted\n- Original file is corrupted\n- File format is not supported\n- Network issues during upload\n\n**Troubleshooting Steps:**\n\n1. **Re-save the file:**\n   - Open in Excel and save as a new file\n   - Try "Save As" → Excel Workbook (.xlsx)\n\n2. **Try different format:**\n   - Export as CSV (.csv) for better compatibility\n   - Save as Excel 97-2003 (.xls) if needed\n\n3. **Check file integrity:**\n   - Verify you can open the file locally\n   - Check file size (should be > 0 bytes)\n\n4. **Re-upload:**\n   - Clear browser cache\n   - Try uploading again\n\n**Alternative Solutions:**\n- Copy data into a new spreadsheet\n- Use Google Sheets and export as Excel\n- Upload as a text/CSV file instead\n\nWould you like to try uploading the file again or in a different format?' 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}

// Capabilities Interaction Demo
export function ChatDemoCapabilitiesInteraction() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Welcome! I can help you with various business tasks. Use the capabilities menu at the bottom to explore what I can do, or ask me directly about:\n\n🏢 **Sales & CRM**\n- Customer management\n- Sales pipeline tracking\n- Revenue analysis\n\n📊 **Marketing**\n- Campaign management\n- Analytics and reporting\n- Lead generation\n\n👥 **HR & Operations**\n- Employee management\n- Project tracking\n- Document processing\n\n💰 **Finance**\n- Financial reporting\n- Budget analysis\n- Expense tracking\n\nTry clicking on any capability in the menu below to get started!' 
        }
      ]
    },
    {
      id: '2',
      role: 'user',
      parts: [
        { type: 'text', text: 'I clicked on Sales → Customers → Acme Corp' }
      ]
    },
    {
      id: '3',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Great! You\'ve selected **Acme Corp** from the customers list. Here\'s what I found:' 
        },
        {
          type: 'data-customer-card',
          data: {
            id: 'acme-corp',
            name: 'Acme Corp',
            type: 'Enterprise Customer',
            revenue: '$125,000 ARR',
            industry: 'Technology',
            employees: 500,
            lastContact: '2024-01-15',
            status: 'active',
            contacts: [
              { name: 'John Smith', role: 'CTO', email: 'john@acme.com' },
              { name: 'Sarah Johnson', role: 'Procurement', email: 'sarah@acme.com' }
            ],
            recent_activity: [
              { date: '2024-01-15', activity: 'Contract renewal discussion' },
              { date: '2024-01-10', activity: 'Product demo scheduled' },
              { date: '2024-01-05', activity: 'Support ticket resolved' }
            ],
            opportunities: [
              { name: 'Enterprise License Renewal', value: '$150K', stage: 'Negotiation' },
              { name: 'Additional Modules', value: '$25K', stage: 'Proposal' }
            ]
          }
        }
      ]
    },
    {
      id: '4',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '**Available Actions for Acme Corp:**\n\n🎯 **Sales Actions**\n- Schedule follow-up meeting\n- Update opportunity status\n- Send contract renewal proposal\n\n📞 **Communication**\n- Log customer call\n- Send email update\n- Schedule product demo\n\n📊 **Analytics**\n- View customer health score\n- Generate account report\n- Analyze usage patterns\n\nWhat would you like to do next?' 
        }
      ]
    },
    {
      id: '5',
      role: 'user',
      parts: [
        { type: 'text', text: 'Now I want to explore Marketing → Campaign Management' }
      ]
    },
    {
      id: '6',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'Perfect! You\'ve navigated to **Campaign Management**. Here\'s an overview of your marketing campaigns:' 
        },
        {
          type: 'data-campaigns',
          data: {
            title: 'Active Marketing Campaigns',
            campaigns: [
              {
                id: 'winter-promo',
                name: 'Winter Promotion 2024',
                status: 'active',
                type: 'Email + Social',
                start_date: '2024-01-01',
                end_date: '2024-02-29',
                budget: 15000,
                spent: 8500,
                leads: 247,
                conversions: 23,
                roi: '180%'
              },
              {
                id: 'product-launch',
                name: 'New Product Launch',
                status: 'planning',
                type: 'Multi-channel',
                start_date: '2024-02-15',
                end_date: '2024-04-15',
                budget: 25000,
                spent: 0,
                leads: 0,
                conversions: 0,
                roi: 'TBD'
              },
              {
                id: 'retargeting',
                name: 'Retargeting Campaign',
                status: 'active',
                type: 'Digital Ads',
                start_date: '2024-01-10',
                end_date: '2024-03-10',
                budget: 8000,
                spent: 3200,
                leads: 89,
                conversions: 12,
                roi: '150%'
              }
            ]
          }
        }
      ]
    },
    {
      id: '7',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '**Campaign Management Actions:**\n\n📝 **Create & Edit**\n- Create new campaign\n- Duplicate existing campaign\n- Edit campaign settings\n\n📊 **Analytics & Reporting**\n- View detailed performance\n- Generate ROI report\n- Compare campaign metrics\n\n⚙️ **Management**\n- Pause/resume campaigns\n- Adjust budgets\n- Update target audiences\n\n🎯 **Optimization**\n- A/B test variations\n- Optimize targeting\n- Adjust bidding strategies\n\nWhich campaign would you like to work with, or what action would you like to take?' 
        }
      ]
    },
    {
      id: '8',
      role: 'user',
      parts: [
        { type: 'text', text: 'Let me check HR → Employee Management → Performance Reviews' }
      ]
    },
    {
      id: '9',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: 'You\'ve accessed **Performance Reviews** in HR. Here\'s the current status of performance reviews:' 
        },
        {
          type: 'data-performance',
          data: {
            title: 'Performance Review Dashboard',
            period: 'Q4 2023',
            overview: {
              total_employees: 127,
              reviews_completed: 89,
              reviews_pending: 23,
              reviews_overdue: 15,
              completion_rate: 70.1
            },
            departments: [
              {
                name: 'Engineering',
                employees: 45,
                completed: 38,
                pending: 5,
                overdue: 2,
                avg_rating: 4.2
              },
              {
                name: 'Sales',
                employees: 28,
                completed: 22,
                pending: 4,
                overdue: 2,
                avg_rating: 3.9
              },
              {
                name: 'Marketing',
                employees: 18,
                completed: 12,
                pending: 3,
                overdue: 3,
                avg_rating: 4.0
              },
              {
                name: 'Operations',
                employees: 15,
                completed: 9,
                pending: 4,
                overdue: 2,
                avg_rating: 3.8
              }
            ],
            upcoming_deadlines: [
              { employee: 'Alex Chen', department: 'Engineering', due_date: '2024-01-25' },
              { employee: 'Maria Garcia', department: 'Sales', due_date: '2024-01-27' },
              { employee: 'David Kim', department: 'Marketing', due_date: '2024-01-30' }
            ]
          }
        }
      ]
    },
    {
      id: '10',
      role: 'assistant',
      parts: [
        { 
          type: 'text', 
          text: '**Performance Review Actions:**\n\n✅ **Review Management**\n- Schedule new reviews\n- Send completion reminders\n- Mark reviews as complete\n\n📋 **Templates & Forms**\n- Create review templates\n- Customize evaluation forms\n- Set review criteria\n\n📊 **Analytics & Reports**\n- Generate department reports\n- Track completion rates\n- Analyze performance trends\n\n🔔 **Notifications**\n- Send deadline reminders\n- Notify managers of overdue reviews\n- Schedule follow-up meetings\n\n**Attention Required:**\n- 15 reviews are **overdue**\n- 23 reviews are **pending**\n- 3 employees have upcoming deadlines this week\n\nWould you like me to send reminder notifications or help with any specific review tasks?' 
        }
      ]
    }
  ])

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}
