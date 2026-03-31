import { z } from 'zod';

export const contactSchema = z.object({
  parentName: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  childName: z.string().min(2, 'Please enter your child’s name'),
  childAge: z.coerce.number().min(2, 'Age must be 2 or above').max(6, 'Age must be 6 or below'),
  program: z.string().min(1, 'Choose a program'),
  startDate: z.string().min(1, 'Choose a preferred start date'),
  notes: z.string().max(500).optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactFormInput = z.input<typeof contactSchema>;

export const defaultContactValues: ContactFormValues = {
  parentName: '',
  email: '',
  phone: '',
  childName: '',
  childAge: 3,
  program: 'toddler',
  startDate: '',
  notes: ''
};

export const contactStepFields = [
  ['parentName', 'email', 'phone'],
  ['childName', 'childAge'],
  ['program', 'startDate', 'notes']
] as const;
