export interface BaseTestimonialCardProps {
  data: BaseTastimonialData;
}

export interface BaseTastimonialData {
  name: string;
  role: string;
  testimonial: string;
  avatar: React.ReactNode;
  valuation: number;
}

/**
 Exemple:
  const data = {
      name: 'John Doe',
      role: 'Software Engineer',
      testimonial:
        '"A customer testimonial that highlights features and answers potential customer doubts about your product or service. Showcase testimonials from a similar demographic to your customers."',
      avatar: <img src="avatar.jpg" alt="John Doe" />,
      valuation: 4,
  };
 */
