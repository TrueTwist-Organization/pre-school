import {
  buildGalleryImage,
  buildParentAvatar
} from '@/assets/illustrations';

export const site = {
  name: 'NanhiDuniya Preschool',
  city: 'Ahmedabad, Gujarat',
  motto: 'Play • Grow • Shine',
  phone: '+91 98765 43210',
  email: 'hello@nanhiduniyapreschool.in',
  address: 'Bodakdev, Ahmedabad, Gujarat 380054'
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Activities', href: '#activities' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Admission', href: '#admission' }
];

export const stats = [
  { label: 'Students', value: 250, suffix: '+' },
  { label: 'Teachers', value: 35, suffix: '+' },
  { label: 'Years', value: 12, suffix: '+' }
];

export const programs = [
  {
    title: 'Playgroup',
    age: '2-3 yrs',
    accent: '#FF9F1C',
    description:
      'A gentle first-school experience with sensory play, music, movement, and happy separation support.',
    highlights: ['Sensory play', 'Music time', 'First social steps'],
    cta: 'Explore Playgroup'
  },
  {
    title: 'Nursery',
    age: '3-4 yrs',
    accent: '#F4C430',
    description:
      'A joyful bridge into structured learning with phonics, numbers, art, and playful social growth.',
    highlights: ['Phonics start', 'Creative art', 'Social play'],
    cta: 'Explore Nursery'
  },
  {
    title: 'Junior KG',
    age: '4-5 yrs',
    accent: '#67C97C',
    description:
      'A lively year focused on writing readiness, early reading, math play, and confident classroom habits.',
    highlights: ['Reading readiness', 'Number sense', 'Confidence building'],
    cta: 'Explore Junior KG'
  },
  {
    title: 'Senior KG',
    age: '5-6 yrs',
    accent: '#5C9DFF',
    description:
      'A polished school-readiness program that prepares children for a smooth, joyful move to Grade 1.',
    highlights: ['School prep', 'Writing practice', 'Public speaking'],
    cta: 'Explore Senior KG'
  }
];

export const features = [
  {
    title: 'Safety First',
    description: 'Child-safe design, soft flooring, secure access, and highly supervised spaces.'
  },
  {
    title: 'Play-based Learning',
    description: 'Learning experiences that feel like discovery, not pressure.'
  },
  {
    title: 'CCTV & Security',
    description: 'Modern security systems with parent trust and visibility in mind.'
  },
  {
    title: 'Nutritious Meals',
    description: 'Healthy meals and snacks that support growing minds and bodies.'
  },
  {
    title: 'Expert Teachers',
    description: 'Warm, qualified educators who understand early childhood development.'
  },
  {
    title: 'Modern Facilities',
    description: 'Bright classrooms, joyful play spaces, art rooms, and age-appropriate amenities.'
  }
];

export const facilities = [
  {
    id: 'classroom',
    title: 'Safe Classrooms',
    description:
      'Bright Montessori-inspired classrooms with cozy reading corners, tactile tools, and joyful daily routines.',
    photo: {
      title: 'Safe Classrooms',
      image: '/safe-classrooms-bg.png'
    }
  },
  {
    id: 'toys',
    title: 'Learning Toys',
    description:
      'A colorful collection of age-appropriate toys and manipulatives that make learning hands-on and exciting.',
    photo: {
      title: 'Learning Toys',
      image: '/learning-toys-bg.png'
    }
  },
  {
    id: 'cctv',
    title: 'CCTV & Security',
    description:
      'High-trust monitoring and secure access systems that keep families informed and children safe.',
    photo: {
      title: 'CCTV & Security',
      image: '/cctv-security-facility-bg.png'
    }
  },
  {
    id: 'playground',
    title: 'Playground',
    description:
      'A colorful outdoor play zone with safe surfaces, mini rides, and spaces for movement and imagination.',
    photo: {
      title: 'Playground',
      image: '/playground-facility-bg.png'
    }
  }
];

export const gallery = [
  buildGalleryImage('Happy classroom mornings', '#FF9F1C'),
  buildGalleryImage('Balloon day fun', '#F4C430'),
  buildGalleryImage('Outdoor play smiles', '#67C97C'),
  buildGalleryImage('Toy learning corner', '#5C9DFF'),
  buildGalleryImage('Creative craft time', '#FFA0C3'),
  buildGalleryImage('Trustworthy teacher care', '#9B5DE5'),
  buildGalleryImage('Festive celebrations', '#D9A5A5'),
  buildGalleryImage('Parent tour moments', '#45B7D1')
];

export const testimonials = [
  {
    name: 'Priya Shah',
    role: 'Mother of Aarav, Nursery',
    quote:
      'NanhiDuniya feels like a second home. The staff is warm, the environment is beautiful, and Aarav runs in happily every morning.',
    avatar: buildParentAvatar('Priya')
  },
  {
    name: 'Rohan Mehta',
    role: 'Father of Meera, Kindergarten',
    quote:
      'The balance of safety, premium care, and playful learning is exactly what we wanted for our daughter.',
    avatar: buildParentAvatar('Rohan')
  },
  {
    name: 'Neha Patel',
    role: 'Mother of Kiara, Toddler',
    quote:
      'The whole school has such a joyful, polished feel. We especially love the teachers and the colorful activities.',
    avatar: buildParentAvatar('Neha')
  }
];

export const steps = ['Inquiry', 'Visit', 'Registration', 'Start Learning'] as const;

export const programOptions = programs.map((program) => ({
  value: program.title.toLowerCase(),
  label: `${program.title} (${program.age})`
}));

export const mapEmbedUrl =
  'https://www.google.com/maps?q=Ahmedabad%20Gujarat&z=12&output=embed';
