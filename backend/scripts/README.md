# Seed Data Script

This script populates the database with mock data for testing and development purposes.

## What it creates:

- **8 Recruiter Users**: Each with unique email addresses and credentials
- **8 Companies**: Linked to the recruiter users with realistic company information
- **24 Jobs**: Distributed across the companies (3 jobs per company) with diverse job listings

## How to run:

1. Make sure your `.env` file is configured with the correct `MONGODB_URI`
2. Navigate to the backend directory
3. Run the seed script:

```bash
npm run seed
```

Or directly:

```bash
node scripts/seedData.js
```

## What the script does:

1. Connects to your MongoDB database
2. Clears existing data (recruiters, companies, and jobs)
3. Creates 8 recruiter users with the following credentials:
   - Email: `[name]@[company].com`
   - Password: `Recruiter123!`
   - Role: `Recruiter
4. Creates 8 companies linked to the recruiters
5. Creates 24 jobs distributed across the companies

## Default Credentials:

All recruiter accounts use the password: `Recruiter123!`

Example login credentials:
- Email: `sarah.johnson@techcorp.com`
- Password: `Recruiter123!`

## Companies Created:

1. TechCorp Solutions (San Francisco, CA)
2. DataFlow Analytics (New York, NY)
3. GreenTech Innovations (Seattle, WA)
4. FinanceHub (Chicago, IL)
5. HealthCare Digital (Boston, MA)
6. EduTech Solutions (Austin, TX)
7. CloudVault Systems (Denver, CO)
8. RetailMax (Portland, OR)

## Notes:

- The script will delete existing recruiters, companies, and jobs before seeding
- Student users are not affected by the seed script
- All passwords are automatically hashed by the User model's pre-save hook
- Jobs are automatically linked to their respective companies and creators

