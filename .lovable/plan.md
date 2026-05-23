## Goal
Add client-side validation to the admission form so the phone number field accepts only valid 11-digit Bangladeshi mobile numbers (max 11 digits, numeric only).

## Changes

### 1. AdmissionForm.tsx
- Update `phone` input with `type="tel"`, `inputMode="numeric"`, `maxLength={11}`
- Add `onChange` handler that strips non-numeric characters and caps at 11 digits
- Add `onChange` handler for `emergencyContact` with same sanitization
- Add validation rule on submit: phone must be exactly 11 digits and start with `01`
- Show Bangla error toast if phone format is invalid

### 2. AdminTrainers.tsx (if needed)
- Check if any phone/contact fields here need the same treatment — currently no phone input in trainer form, so skip.

## Acceptance Criteria
- User cannot type more than 11 digits in phone fields
- Non-numeric characters are blocked/stripped automatically
- Submit shows clear Bangla error if phone is not a valid 11-digit Bangladeshi number
- Emergency contact gets same digit sanitization (optional validation)