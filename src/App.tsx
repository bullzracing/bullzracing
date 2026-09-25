import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Trophy, Users, Building2, MessageSquare, Menu, X, ChevronLeft, ChevronRight, Mail, Phone, MapPin, ExternalLink, Instagram, Linkedin, Facebook, Youtube} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-secondary rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-effect"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedSponsor, setSelectedSponsor] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [blogText, setBlogText] = useState<string>('');
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState<string | null>(null);
  const [page, setPage] = useState<'home' | 'blog'>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<{title: string; file: string; author: string; date: string;} | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  

  const openBlogPage = (blog: { id: string }) => {
    setSelectedInsight(null);
    window.location.hash = `#blog/${blog.id}`;
  };

  const closeBlogPage = () => {
    setTimeout(() => {
      window.location.hash = '';
    }, 300);
  };
  const heroSlides = [
    {
      image: '/Resources/Home/TachoBgV2.jpg',
      title: 'BZR4 - Tachometer',
      subtitle: 'Concept to Cockpit #1',
      desc: 'Custom RGB Based Tachometer Display for BZR4 - click to read',
      action: () => {
        document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          const index = insights.findIndex(a => a.id === 'blogs');
          setSelectedInsight(index);
        }, 500);
        setTimeout(() => {
          openBlogPage({ id: 'tachometer' }); 
        }, 1000);
      } 
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/FB26_2_alt.jpg`,
      title: 'FB \'26',
      subtitle: 'The One That Changed Us',
      desc: 'Our FB \'26 Story - click to read',
      action: () => {
        document.getElementById("insights")?.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          const index = insights.findIndex(a => a.id === 'blogs');
          setSelectedInsight(index);
        }, 500);
        setTimeout(() => {
          openBlogPage({ id: 'fb26' }); 
        }, 1000);
      } 
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/fb26home.jpg`,
      title: '4th Overall',
      subtitle: 'Formula Bharat 2026',
      desc: 'Kari Motor Speedway, Coimbatore',
      action: () => {
        document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = achievements.findIndex(a => a.id === "fb26");
          setSelectedAchievement(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr4.jpg`,
      title: 'BZR-4',
      subtitle: 'BZR 4 Reveal',
      desc: 'BMSCE, Bengaluru',
      action: () => {
        document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = cars.findIndex(a => a.id === "bzr4");
          setSelectedCar(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/supra25home.jpg`,
      title: '5th Overall',
      subtitle: 'Supra SAEIndia 2025',
      desc: 'Buddh International Circuit, Noida',
      action: () => {
        document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = achievements.findIndex(a => a.id === "supra25");
          setSelectedAchievement(index);
        }, 500); // adjust timing
      }

    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr 3.2 edited.jpg`,
      title: 'BZR-3.2',
      subtitle: 'Supra \'25',
      desc: 'Buddh International Circuit, Noida',
      action: () => {
        document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = cars.findIndex(a => a.id === "bzr3.2");
          setSelectedCar(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/fb25home.jpg`,
      title: '6th Overall',
      subtitle: 'Formula Bharat 2025',
      desc: 'Kari Motor Speedway, Coimbatore',
      action: () => {
        document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = achievements.findIndex(a => a.id === "fb25");
          setSelectedAchievement(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/bzr3.1.jpg`,
      title: 'BZR-3.1',
      subtitle: 'FB \'25',
      desc: 'Kari Motor Speedway, Coimbatore',
      action: () => {
        document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = cars.findIndex(a => a.id === "bzr3.1");
          setSelectedCar(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/supra24home.JPG`,
      title: '4th Overall',
      subtitle: 'Supra SAEIndia 2024',
      desc: 'Buddh International Circuit, Noida'
      ,
      action: () => {
        document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = achievements.findIndex(a => a.id === "supra24");
          setSelectedAchievement(index);
        }, 500); // adjust timing
      }
    },
    {
      image: `${import.meta.env.BASE_URL}Resources/Home/bzr3supra.png`,
      title: 'BZR-03',
      subtitle: 'Supra \'24',
      desc: 'Buddh International Circuit, Noida',
      action: () => {
        document.getElementById("cars")?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const index = cars.findIndex(a => a.id === "bzr3");
          setSelectedCar(index);
        }, 500); // adjust timing
      }
    },
  ];

  const achievements = [
    {
      id: "supra26",
      year: '2026',
      title: '7th Overall',
      event: 'Supra SAEIndia',
      description: "Strong performances in the static events showed what our team is capable of, but endurance didn’t go the way we expected. We leave SUPRA SAEIndia 2026 with lessons learned and a stronger resolve to come back better.",
      points: [
        { name: 'Skidpad', score: 2 },
        { name: 'Autocross', score: 2 },
        { name: 'Cost Report', score: 3 },
        { name: 'Business Plan Presentation', score: 3 },
        { name: 'Engineering Design Presentation', score: 7 },
        { name: 'Acceleration', score: 10 }
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/supra26ach1.JPG`,
        `${import.meta.env.BASE_URL}Resources/Achievements/supra26ach2.JPG`,
      ],
    },
    {
      id: "fb26",
      year: '2026',
      title: '4th Overall',
      event: 'Formula Bharat',
      description: "Our first time participating in dynamic events at Formula Bharat, and our first time completing endurance at FB :)\n A culmination of all our past learnings, and a gateway to all that follows.",
      points: [
        { name: 'Endurance', score: 2 },
        { name: 'Engineering Design Presentation', score: 3 },
        { name: 'Business Plan Presentation', score: 5 },
        { name: 'Cost Report', score: 8 }
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/fb26ach1.jpeg`,
        `${import.meta.env.BASE_URL}Resources/Achievements/fb26ach2.jpg`,
      ],
    },
    {
      id: "supra25",
      year: '2025',
      title: '5th Overall',
      event: 'Supra SAEIndia',
      description: 'Bullz Racing was the first team to complete Technical Inspection at Supra \'25, while performing to our maximum potential at dynamic events. We also won Best in Engineering Excellence, showcasing our technical advancements and engineering prowess.',
      points: [
        { name: 'Computer Aided Engineering', score: 2 },
        { name: 'Skidpad', score: 4 },
        { name: 'Endurance', score: 5 },
        { name: 'Autocross', score: 7 },
        { name: 'Acceleration', score: 8 },

        { name: 'Business Plan Presentation Design', score: 5 },
        { name: 'Engineering Design Presentation', score: 5 }
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/supra25ach1.JPG`,
        `${import.meta.env.BASE_URL}Resources/Achievements/supra25ach2.jpg`,
      ],
    },
    {
      id: "fb25",
      year: '2025',
      title: '6th Overall',
      event: 'Formula Bharat',
      description: "Bullz Racing's second time at Formula Bharat, the team, along with the BZR 3.1, brought home the results that follow, while learning from our experiences from FB '24.",
      points: [
        { name: 'Engineering Design Presentation', score: 3 },
        { name: 'Business Plan Presentation', score: 4 },
        { name: 'Cost Report', score: 8 }
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/fb25ach1.jpg`,
        `${import.meta.env.BASE_URL}Resources/Achievements/fb25ach2.jpg`,
      ],
    }
    ,
    {
      id: "supra24",
      year: '2024',
      title: '4th Overall',
      event: 'Supra SAEIndia',
      description: 'Supra \'24 was BZR-03\'s debut event, and saw the team attempt all dynamic events for the first time. Our experience from Supra \'23 helped us compete in, and complete endurance.',
      points: [
        { name: 'Computer Aided Engineering', score: 2 },
        { name: 'Autocross', score: 3 },
        { name: 'Acceleration', score: 3 },
        { name: 'Endurance', score: 5 },
        { name: 'Business Plan Presentation Design', score: 4 },
        { name: 'Engineering Design Presentation', score: 3 },
        { name: 'Skidpad', score: 8 }
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/supra24ach1.JPG`,
        `${import.meta.env.BASE_URL}Resources/Achievements/supra24ach2.JPG`,
      ],
    },
    {
      id: "fb24",
      year: '2024',
      title: '9th Overall',
      event: 'Formula Bharat',
      description: 'Bullz Racing\'s first time at Formula Bharat. Provided large insights and exposure to the team. We also won the Altair Simulation Challenge and were awarded a sum of ₹50,000',
      points: [
        { name: 'Business Plan Presentation', score: 7 },
        { name: 'Engineering Design Presentation', score: 8 },
        { name: 'Cost Report', score: 11 },
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/fb24ach1.JPG`,
        `${import.meta.env.BASE_URL}Resources/Achievements/fb24ach2.JPG`,
      ],
    },
    {
      id: "supra23",
      year: '2023',
      title: '9th Overall',
      event: 'Supra SAEIndia',
      description: 'Swiftly cleared Technical Scrutiny and participated in Endurance. opportunity of driving on track helped identify bzr2s strength and weaknesses ',
      points: [
        { name: 'Computer Aided Engineering', score: 2 },
        { name: 'Engineering Design Presentation', score: 5 },
        { name: 'Business Plan Presentation Design', score: 7 },
      ],
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/supra23ach1.jpg`,
        `${import.meta.env.BASE_URL}Resources/Achievements/supra23ach2.jpg`,
      ],
    },
    {
      id: "supra22",
      year: '2022',
      title: '27th Overall',
      event: 'Supra SAEIndia',
      description: 'First event that Bullz Racing participated in after transitioning from Go-Karts to Formula Student. We cleared Mechanical Scrutiny and Tilt test, providing a stepping stone into Formula Student',
      images: [
        `${import.meta.env.BASE_URL}Resources/Achievements/supra22ach1.jpg`
      ],
    },
  ];

  const insights = [
    {
      id: 'blogs',
      title: 'Blogs',
      description: 'Read our latest behind-the-scenes stories, engineering insights, and race prep highlights from the Bullz Racing team.',
      content: '',
      source: '',
    },
    {
      title: 'Newsletters',
      description: "Stay updated on what's happening with the team and receive progress reports delivered directly to our motorsport community.",
      content: '',
    },
    {
      title: 'Updates',
      description: 'Stay informed regarding all team announcements and club acitivities from Bullz Racing.',
      content: 'Coming soon!',
    },
  ];

  const blogs = [
    {
      id: 'maxwellBlog',
      title: 'Building Confidence, One Cell at a Time',
      description: "Bullz Racing’s first EV journey, powered by Maxwell Energy.",
      author: 'Abhay Gautham and Lipin Kariappa',
      date: '22nd September, 2026',
      source: '/Resources/Blogs/maxwellBlog.md'
    },
    {
      id: 'tachometer',
      title: 'RGB Based Tachometer Display for BZR4',
      description: 'Concept to Cockpit #1: Developing a custom RGB based tachometer display for BZR4.',
      author: 'Prateek Moji',
      date: '17th June, 2026',
      source: '/Resources/Blogs/Tachometer.md',
    },
    {
      id: 'fb26',
      title: "FB '26: The One That Changed Us",
      description: 'A behind-the-scenes look at our most defining FB campaign yet.',
      author: 'S Prapthisha and Ishan Patil',
      date: '8th April, 2026',
      source: '/Resources/Blogs/FB26.md',
    }
  ];

  const newsletters = [
    {
      month: 'August 2026',
      link: 'https://heyzine.com/flip-book/22575ff45f.html'
    },
    {
      month: 'November 2025',
      link: 'https://heyzine.com/flip-book/d3dec30d8a.html'
    },
    {
      month: 'October 2025',
      link: 'https://heyzine.com/flip-book/bcc64f7737.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC9uZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'September 2025',
      link: 'https://heyzine.com/flip-book/b64cef0dbe.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC9y9leHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'July 2025',
      link: 'https://heyzine.com/flip-book/1305fde485.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC98lleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'June 2025',
      link: 'https://heyzine.com/flip-book/44777497f5.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPNTY3MDY3MzQzMzUyNDI3AAGnvhPIg2sWSVeQpO4IIUxqaZXMn-Y9b5O6Rl0Ka1T6Ie_2SgotOvvU_7LABnE_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'May 2025',
      link: 'https://heyzine.com/flip-book/071142fff1.html'
    },
    {
      month: 'April 2025',
      link: 'https://heyzine.com/flip-book/2e189a44a0.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC-AZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'February 2025',
      link: 'https://heyzine.com/flip-book/046aa3bb6e.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC-EFleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'January 2025',
      link: 'https://heyzine.com/flip-book/e5a53289ea.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRzdgRC-HRleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAae-E8iDaxZJV5Ck7gghTGpplcyf5j1vk7pGXQprVPoh7_ZKCi06-9T_ssAGcQ_aem_788glWnHGrQtQypVj0Im1Q'
    },
    {
      month: 'December 2024',
      link: 'https://heyzine.com/flip-book/039a71dc54.html'
    },
    {
      month: 'November 2024',
      link: 'https://heyzine.com/flip-book/6de9c274dc.html'
    },
    {
      month: 'September 2024',
      link: 'https://heyzine.com/flip-book/a55e78d1dd.html'
    },
    {
      month: 'August 2024',
      link: 'https://heyzine.com/flip-book/37d64d0cb5.html'
    },
    {
      month: 'July 2024',
      link: 'https://heyzine.com/flip-book/e3b913bcb6.html'
    }
  ];

  const cars = [
    {
      id: "bzr 4.1",
      name: "BZR 4.1",
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr4.1cropped.jpg`,
      specs: "Carbon Fibre Bodyworks • Ackerman Steering • E-bias for Braking",
      description: "Our first car to feature full Carbon Fibre bodyworks and E-bias for the braking system.",
      details: {
        powertrain: "Combustion",
        power: "27 hp / 23 Nm Torque",
        acceleration: "5.2s • 75m",
        weight: "201 kg",
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/bzr4.1track.JPG`,
        `${import.meta.env.BASE_URL}Resources/Cars/bzr4.1static.jpg`,
      ],
    },
    {
      id: "bzr4",
      name: 'BZR 4',
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr4cropped.jpg`,
      specs: 'Custom Lightweight Aero Kit • 10 inch Wheels • Anti Ackerman Steering',
      description: 'Our first 10 inch (wheel dia.) Formula Student Car featuring a full aerodynamics package. Also our first car to complete endurance at FB :)',
      details: {
        powertrain: 'Combustion',
        power: '27 hp / 23 Nm Torque',
        acceleration: '5.2s • 75m',
        weight: '217 kg',
        features: ['In-house Manufactured Aero Package with redesigned sidepods', 'Custom Tachometer', 'High Performance Cooling System'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/bzr4track.jpg`,
        `${import.meta.env.BASE_URL}Resources/Cars/bzr4rolling.jpeg`,
      ],
    },
    {
      id: "bzr3.2",
      name: 'BZR 3.2',
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr 3.2 edited.jpg`,
      specs: 'Bodywork Upgrades • Digital Dashboard • Improvised DAQ',
      description: 'Our first Formula Student Car to feature a full aerodynamics package.',
      details: {
        powertrain: 'Combustion',
        power: '29 hp / 23 Nm Torque',
        acceleration: '6.57s • 75m',
        weight: '243 kg',
        features: ['In-house Manufactured Aero Package with redesigned sidepods', 'Custom Tachometer', 'High Performance Cooling System'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/bzr3.2rolling.JPG`,
        `${import.meta.env.BASE_URL}Resources/Cars/bzr3.2track.JPG`,
      ],
    },
    {
      id: "bzr3.1",
      name: 'BZR 3.1',
      image: `${import.meta.env.BASE_URL}Resources/Cars/BZR 3.1 full aero.png`,
      specs: 'Custom In-house Manufactured Aero Kit • Improvised Telemetry • Enhanced Steering',
      description: 'Our first Formula Student Car to feature a full aerodynamics package.',
      details: {
        powertrain: 'Combustion',
        power: '29 hp / 23 Nm Torque',
        acceleration: '5.2s • 75m',
        weight: '255 kg',
        features: ['In-house Manufactured Aero Package with redesigned sidepods', 'Custom Tachometer', 'High Performance Cooling System'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/IMG_7600.jpg`,
        `${import.meta.env.BASE_URL}Resources/Cars/BZR 3.1 full cropped.png`,
      ],
    },
    {
      id: "bzr3",
      name: 'BZR 03',
      image: `${import.meta.env.BASE_URL}Resources/Cars/bzr3supra.png`,
      specs: 'Lightweight Chassis • Optimized Cooling System • Improved Packaging',
      description: 'Bullz Racing\'s third Formula Student Car, featuring a lightweight chassis with lower center of gravity and improduction of Passive Aerodynamic Devices such as Sidepods.',
      details: {
        powertrain: 'Combustion',
        power: '29 hp / 23 Nm Torque',
        acceleration: '5.04s (75m)',
        weight: '235 kg',
        features: ['Lightweight Reinforced Chassis', 'Optimised Exhaust System', 'Redesigned Intake System'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/bzr3supra.png`,
        `${import.meta.env.BASE_URL}Resources/Cars/DSCF6872.JPG`,
      ],
    },
    {
      id: "bzr2.1",
      name: 'BZR 2.1',
      image: `${import.meta.env.BASE_URL}Resources/Cars/Bullz x FB 23 (124) - Copy.JPG`,
      specs: 'Improvised In-House Manufacturing of Composites • Basic Telemetry • Improved Driver Safety',
      description: 'With some upgrades from BZR 02, BZR 2.1 was our first car to participate in Formula Bharat.',
      details: {
        powertrain: 'Combustion',
        power: '29 hp / 23 Nm Torque',
        acceleration: '5.8s (75m)',
        weight: '272.5 kg',
        features: ['Regenerative braking', 'Aluminium chassis', 'Custom battery pack'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/Bullz x FB 23 (124) - Copy.JPG`,
        `${import.meta.env.BASE_URL}Resources/Cars/Bullz x FB 23 (17).JPG`,
      ],
    },
    {
      id: "bzr2",
      name: 'BZR 02',
      image: `${import.meta.env.BASE_URL}Resources/Cars/BZR 02 Supra.jpg`,
      specs: 'Pushrod Suspension • Lighter Bodywork • Bezier Curve Intake',
      description: 'BZR 02 was our first car to clear Technical Scrutiny and participate in Endurance at SAE Supra.',
      details: {
        powertrain: 'Combustion',
        power: '31.8 hp / 25 Nm Torque',
        acceleration: '6.1s (75m)',
        weight: '270 kg',
        features: ['Custom Differential', 'Pushrod Suspension', 'Improved Packaging'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/BZR 02 Supra.jpg`,
        `${import.meta.env.BASE_URL}Resources/Cars/Supra 2023.jpg`,
      ],
    },
    {
      id: "bzr1",
      name: 'BZR 01',
      image: `${import.meta.env.BASE_URL}Resources/Cars/IMG_5969.JPG`,
      specs: 'Combustion Engine • First FS Car • 390cc Engine',
      description: "BZR 01 was Bullz Racing's first Formula Student Car, transitioning from Go-Karts and Formula E-Baja.",
      details: {
        powertrain: 'Combustion',
        power: '23.7 hp / 22.3 Nm Torque',
        acceleration: '8.5s (75m)',
        weight: '380 kg',
        features: ['Steel tube frame', 'Manual sequential gearbox', 'Basic telemetry'],
      },
      images: [
        `${import.meta.env.BASE_URL}Resources/Cars/IMG_5969.JPG`,
        `${import.meta.env.BASE_URL}Resources/Cars/20220824_192525.jpg`,
      ],
    },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handleNavClick = (id: string) => {
    // If on blog page, switch back first
    if (page === 'blog') {
      window.location.hash = '';

      // Wait for DOM to render home page
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatePage = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog/')) {
        const blogId = hash.replace('#blog/', '');
        const foundBlog = blogs.find(
          (blog) => blog.id === blogId
        );
        if (foundBlog) {
          setSelectedBlog({
            title: foundBlog.title,
            file: foundBlog.source,
            author: foundBlog.author,
            date: foundBlog.date,
          });
          setPage('blog');
          return;
        }
      }
      else {
        setSelectedBlog(null);
        setPage('home');
      }
    };
    updatePage();
    window.addEventListener('hashchange', updatePage);
    return () => {
      window.removeEventListener('hashchange', updatePage);
    };
  }, []);

  useEffect(() => {
    const shouldLoadBlog = selectedInsight === 0 || page === 'blog';
    if (!shouldLoadBlog) {
      setBlogText('');
      setBlogError(null);
      setIsBlogLoading(false);
      return;
    }

    const insight = insights[0];
    if (!selectedBlog) {
      setBlogText('');
      setBlogError(null);
      setIsBlogLoading(false);
      return;
    }

    setIsBlogLoading(true);
    setBlogError(null);

    const controller = new AbortController();

    fetch(selectedBlog.file, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load blog content.');
        }
        return response.text();
      })
      .then((text) => {
        const resolvedText = text
          .replace(/\$\{import\.meta\.env\.BASE_URL\}/g, import.meta.env.BASE_URL)
          .replace(/\r\n/g, '\n');
        setBlogText(resolvedText);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setBlogError(error.message);
        }
      })
      .finally(() => setIsBlogLoading(false));

    return () => controller.abort();
  }, [selectedBlog, page]);

  useEffect(() => {
    if (page === 'blog') {
      window.scrollTo(0, 0);
    }
  }, [page]);

  const renderBlogParagraphs = (text: string) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-4xl font-bold text-gold mb-6" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-3xl font-bold text-gold mb-5 clear-both" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-bold text-gold mb-4 clear-both" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-xl font-bold text-gold mb-3" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-bold text-white" {...props} />
        ),
        em: ({ node, ...props }) => (
          <em className="italic text-silver" {...props} />
        ),
        p: ({ node, ...props }: any) => (
          <p
            className="text-silver leading-relaxed mb-6 text-justify"
            {...props}
          />
        ),
        img: ({ node, ...props }: any) => {
          const src = props.src?.startsWith('/')
            ? `${import.meta.env.BASE_URL}${props.src.replace(/^\/+/, '')}`
            : props.src;

          const rawTitle = props.title ?? '';

          const classMatch =
            rawTitle.match(/class=(?:(?:"([^"]+)")|(?:'([^']+)')|([^"']+))/) ?? [];

          const titleClasses =
            classMatch[1] || classMatch[2] || classMatch[3] || '';

          const isFloatRight = titleClasses.includes('float-right');
          const isFloatLeft = titleClasses.includes('float-left');

          return (
            <img
              {...props}
              src={src}
              alt={props.alt || ''}
              loading="eager"
              decoding="sync"
              className="rounded-3xl border border-white/10 shadow-xl"
              style={{
                width: isFloatRight || isFloatLeft ? '600px' : undefined,
                maxWidth: isFloatRight || isFloatLeft ? 'none' : '100%',
                height: 'auto',

                float: isFloatRight
                  ? 'right'
                  : isFloatLeft
                    ? 'left'
                    : 'none',

                marginTop: isFloatRight || isFloatLeft ? '0.5rem' : '2rem',
                marginBottom: isFloatRight || isFloatLeft ? '1rem' : '2rem',

                marginLeft: isFloatRight ? '2rem' : isFloatLeft ? '0' : 'auto',
                marginRight: isFloatLeft ? '2rem' : isFloatRight ? '0' : 'auto',

                display: isFloatRight || isFloatLeft ? 'block' : 'block',
              }}
            />
          );
        },

        pre: ({ children }) => <>{children}</>,
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              customStyle={{
                borderRadius: '1.5rem',
                padding: '1.5rem',
                margin: '1.5rem 0'
              }}
            >

              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="bg-gray-800 text-white px-1 py-0.5 rounded" {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {text}
    </ReactMarkdown>
  );

  const sponsors = [
    {
      name: "Maxwell Energy Systems",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/MaxwellEnergy.png`,
      description: "Maxwell Energy Systems are a leading advanced electronics solutions provider, delivering innovative and reliable technologies through world-class engineering, manufacturing excellence, and a commitment to creating long-term value for their customers and stakeholders.",
      website: "https://www.maxwellenergy.co"
    },
    {
      name: "Aruani Grid",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/AruaniGrid.png`,
      description: "Aruani Grid is Bangalore’s premier motorsports and go-karting destination, offering world-class tracks and training for racing enthusiasts of all skill levels. A hub for aspiring racers, professionals, and motorsport enthusiasts to learn, compete, and grow.",
      website: "https://aruanigrid.com",
    },
    {
      name: "Ace Micromatic Group",
      category: "Monetary",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/AM group logo white.png`,
      description: "Ace Micromatic Group is India's largest machine tool conglomerate, offering a comprehensive range of CNC machines, automation solutions, and industrial IoT technologies for manufacturing industries.",
      website: "https://www.acemicromatic.net/"
    },
    {
      name: "3dconnexion",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/3dconnexion_logo.png`,
      description: "3Dconnexion designs powerful, research-based ergonomic hardware and smart, easy-to-use software that combine seamlessly to make working in the world's most popular CAD applications and 3D environments fast, comfortable and fun.",
      website: "https://3dconnexion.com/us/"
    },
    {
      name: "Ansys",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Ansys.png`,
      description: "ANSYS, Inc. is the leader in multiphysics simulation software. For more than 50 years, Ansys software has enabled innovators across industries to push boundaries by using the predictive power of simulation.",
      website: "https://www.ansys.com/en-in"
    },
    {
      name: "Magod Laser",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Magod laser.png`,
      description: "Magod Laser, leader in Laser Based Manufacturing in India, has consistently built recognized expertise, helping customers to adopt laser based manufacturing processes & applications for numerous industries since 1997.",
      website: "https://www.magodlaser.in/"
    },
    {
      name: "GT-SUITE",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/GT.png`,
      description: "GT-SUITE is the industry-leading simulation tool with capabilities and libraries aimed at a wide variety of applications and industries.",
      website: "https://www.gtisoft.com/gt-suite/"
    },
    {
      name: "Makenica",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Makenica.png`,
      description: "Makenica is a leading online platform offering rapid prototyping and production services, specializing in 3D printing, CNC machining, vacuum casting, and injection molding. ",
      website: "https://makenica.com/"
    },
    {
      name: "MathWorks",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Mathworks.png`,
      description: "MathWorks is the creator of MATLAB and Simulink, providing powerful tools for engineers and scientists to design, analyze, and visualize data. Their solutions are used worldwide across industries to accelerate innovation and improve productivity in engineering and scientific workflows.",
      website: "https://in.mathworks.com/"
    },
    {
      name: "Ricardo",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Ricardo.png`,
      description: "Ricardo offers advanced simulation, design, and analysis services to optimize product development, reduce costs, and accelerate time to market across industries like automotive, aerospace, and maritime.",
      website: "https://www.ricardo.com/en/"
    },
    {
      name: "Simscale",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/SimScale.png`,
      description: "SimScale is a cloud-based engineering simulation platform that enables designers and engineers to perform CFD, FEA, and thermal simulations directly in their web browser.",
      website: "https://www.simscale.com/"
    },
    {
      name: "Solidworks",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/SolidWorks_Logo.png`,
      description: "SOLIDWORKS is a leading 3D CAD software that provides powerful design, simulation, and product development solutions for engineers and designers worldwide.",
      website: "https://www.solidworks.com/"
    },
    {
      name: "Thynke",
      category: "Monetary",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/THYNKE.png`,
      description: "Thynke Services Private Limited offers customized training programs to enhance individuals' soft skills, aptitude, verbal, and technical abilities, aiming to bridge the gap between campus and corporate environments. ",
      website: "https://thynke.co.in/"
    },
    {
      name: "VI-Grade",
      category: "Software",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Vi-grade white.png`,
      description: (
        <>
          VI-grade is a leading provider of simulation and driving simulator solutions for automotive, motorsport, aerospace, and railway industries, enabling virtual prototyping and real-time testing.<br /><br />
          Connect with VI-Grade on:<br />
          <a href="https://www.linkedin.com/company/vi-grade" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            LinkedIn
          </a><br />
          <a href="https://www.youtube.com/user/vigrade01" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            YouTube
          </a><br />
          <a href="https://www.facebook.com/VirtualFormula/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
            Facebook
          </a>
        </>
      ),
      website: "https://www.vi-grade.com/"
    },
    {
      name: "Copperstone Consulting",
      category: "Monetary",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Copperstone Consulting.png`,
      description: "TO BE UPDATED"
    },
    {
      name: "Srinivasa Garage",
      category: "In-kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Srinivasa Garage.png`,
      description: "Specializing in premium paint, bodywork, and interior services, Srinivasa Garage is a one-stop 4-wheeler restoration and repair garage.",
    },
    {
      name: "A Square Engineering Consultancy Services",
      category: "In-Kind",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/A Square Engineering.png`,
      description: "Engineering high-performance electric drivetrains.",
    },
    {
      name: "Become a Sponsor",
      category: "Join us!",
      logo: `${import.meta.env.BASE_URL}Resources/Sponsors/Plus.png`,
      description: "Enhancing downforce to improve race car stability.",
      website: "http://bullzracing.com/#contact"
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: null },
    { id: 'about', label: 'About Us', icon: Users },
    { id: 'insights', label: 'Insights', icon: MessageSquare },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'cars', label: 'Our Cars', icon: Building2 },
    { id: 'sponsors', label: 'Sponsors', icon: Building2 },
    { id: 'contact', label: 'Contact Us', icon: MessageSquare },
  ];

  return (
    <div className="bg-dark min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-md border-b border-white/5 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();

                  // If you're on blog page, switch back
                  window.location.hash = '';

                  // Scroll to top/home
                  document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <img
                  src="./Resources/Logos/Bullz text.png"
                  alt="BULLZ RACING"
                  className="h-10 w-auto object-cover cursor-pointer"
                />
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-gold"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`text-sm font-medium transition-colors ${activeSection === item.id
                    ? 'text-gold drop-shadow-[0_0_8px_rgba(0,0,0,1)]'
                    : 'text-gray-300 hover:text-gold'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`transform transition-all duration-500 ease-in-out md:hidden border-t border-white/5 ${isMenuOpen
            ? 'opacity-100 translate-y-0 max-h-96'
            : 'opacity-0 -translate-y-5 max-h-0 pointer-events-none'
            } overflow-hidden`}
        >
          <div className="flex overflow-x-auto px-4 py-2 space-x-4 scrollbar-hide">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`flex-shrink-0 text-sm font-medium transition-colors whitespace-nowrap ${activeSection === item.id
                  ? 'text-gold'
                  : 'text-gray-300 hover:text-gold'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {page === 'blog' ? (
        <section className="min-h-screen py-20 bg-dark">
          <div className="max-w-7xl mx-auto px-2">
            <button
              onClick={closeBlogPage}
              className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white transition hover:bg-black/70"
            >
              ← Back to Bullz Racing
            </button>
            <div className="glass-card rounded-3xl p-6 bg-black/70 border border-white/10 relative">
              <div className="flex items-start justify-between gap-6">
                <h1 className="text-4xl font-bold text-gold mb-4 flex-1">{selectedBlog?.title}</h1>
                {selectedBlog?.file.includes('maxwellBlog') && (
                  <img
                    src={`${import.meta.env.BASE_URL}Resources/Blogs/maxwellLogo3.png`}
                    alt="Maxwell Energy Systems"
                    className="w-[200px] h-auto object-contain flex-shrink-0"
                  />
                )}
              </div>
              <p className="text-silver mb-6 text-lg italic">{selectedBlog?.author} • {selectedBlog?.date}</p>
              {isBlogLoading && <p className="text-silver">Loading blog content…</p>}
              {blogError && <p className="text-red-400">{blogError}</p>}
              {!isBlogLoading && !blogError && renderBlogParagraphs(blogText)}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section id="home" className="min-h-screen relative overflow-hidden">
            <div className="relative h-screen">
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-3 rounded-full text-gold hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-3 rounded-full text-gold hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={32} />
              </button>
              {heroSlides.map((slide, index) => (
            <div
              key={index}
              onClick={slide.action}
              className={`absolute inset-0 cursor-pointer transition-opacity duration-5000 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover sm:w-full sm:h-auto"
              />

                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="text-center px-4">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl font-bold mb-4 text-gold drop-shadow-[4px_4px_10px_rgba(0,0,0,1)]"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-3xl font-semibold mb-2 text-white drop-shadow-[8px_8px_10px_rgba(0,0,0,1)]"
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-xl text-white max-w-2xl mx-auto drop-shadow-[8px_8px_10px_rgba(0,0,0,1)]"
                      >
                        {slide.desc}
                      </motion.p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gold">About Us</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="./Resources/Home/cover.jpg"
                    alt="Team working"
                    className="rounded-lg shadow-xl w-128"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <p className="text-silver text-lg leading-relaxed">
                    The official Formula Student Team of B.M.S College of Engineering, BULLZ RACING is a passionate team of engineering students dedicated to designing, building, and racing formula-style race cars. We combine innovation, determination, and technical expertise to compete among the top teams at the national level.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="glass-card p-6 rounded-lg text-center">
                      <p className="text-3xl font-bold text-gold mb-2">80+</p>
                      <p className="text-silver">Team Members</p>
                    </div>
                    <a href="#cars">
                      <div className="glass-card p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform">
                        <p className="text-3xl font-bold text-gold mb-2">8</p>
                        <p className="text-silver">Completed FS Cars</p>
                      </div>
                    </a>

                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Insights Section */}
          <section id="insights" className="py-20 bg-dark">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gold">Insights</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {insights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-8 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-transform"
                    onClick={() => setSelectedInsight(index)}
                  >
                    <h3 className="text-2xl font-bold text-gold mb-4">{item.title}</h3>
                    <p className="text-silver leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <AnimatePresence>
        {selectedInsight !== null && (
          <Modal isOpen={true} onClose={() => setSelectedInsight(null)}>
            <motion.div
              className="space-y-6 relative p-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setSelectedInsight(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ✕
              </button>

              <h3 className="text-3xl font-bold text-gold">{insights[selectedInsight].title}</h3>
              {selectedInsight === 0 ? (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {blogs.map((blog, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/10 bg-black/50 p-5 cursor-pointer transition hover:border-gold hover:bg-white/5"
                      onClick={() => {
                        window.location.hash = `#blog/${blog.id}`;
                        setSelectedInsight(null);
                      }}
                    >
                      <h4 className="text-2xl font-semibold text-gold">{blog.title}</h4>
                      <p className="text-silver mt-2">{blog.description}</p>
                    </div>
                  ))}
                </div>
              ) : selectedInsight === 1 ? (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {newsletters.map((newsletter, index) => (
                    <a
                      key={index}
                      href={newsletter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-3xl border border-white/10 bg-black/50 p-5 transition hover:border-gold hover:bg-white/5"
                    >
                      <h4 className="text-2xl font-semibold text-gold">{newsletter.month} Newsletter</h4>
                      <p className="text-silver mt-2">Click to read the newsletter.</p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-silver text-lg leading-relaxed">
                  {insights[selectedInsight].content || 'Content will be available here soon.'}
                </p>
              )}
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">Achievements</h2>
          <div className="grid md:grid-cols-7 gap-5">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-lg cursor-pointer"
                onClick={() => setSelectedAchievement(index)}
              >
                <p className="text-gold text-xl font-bold mb-2">{achievement.year}</p>
                <h3 className="text-white text-lg font-semibold mb-2">{achievement.title}</h3>
                <p className="text-silver">{achievement.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section id="cars" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold ">Our Cars</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {cars.map((car, index) => {
              const isLast = index === cars.length - 1;
              const isOddLastRow = cars.length % 3 === 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${isLast && isOddLastRow ? "md:col-start-2" : ""
                    }`}
                  onClick={() => setSelectedCar(index)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="absolute bottom-0 p-6">
                        <h3 className="text-2xl font-bold text-gold mb-2">
                          {car.name}
                        </h3>
                        <p className="text-silver">{car.specs}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-dark-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center text-gold">
              Sponsors
            </h2>

            {/* Featured Video */}
            <div className="mb-16 max-w-5xl mx-auto">
              <div
                className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
                style={{ paddingTop: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/y9mb5MAnAHs"
                  title="Bullz Racing"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="relative max-w-6xl mx-auto">
              {/* Left Button */}
              <button
                ref={prevRef}
                className="
                  absolute
                  left-2 md:-left-12 lg:-left-16
                  top-1/2
                  -translate-y-1/2
                  z-20
                  p-3
                  rounded-full
                  bg-black/60
                  text-gold
                  hover:bg-black/80
                  transition
                "
              >
                <ChevronLeft size={32} />
              </button>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // @ts-ignore
                    swiper.params.navigation.prevEl = prevRef.current;
                    // @ts-ignore
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                breakpoints={{
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 30 },
                  1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
              >
                {sponsors.map((sponsor, index) => (
                  <SwiperSlide key={index}>
                    <div 
                      className="clickable bg-black p-6 rounded-lg border border-neutral-800 hover:border-amber-500 group cursor-pointer max-w-80%"
                      onClick={() => setSelectedSponsor(sponsor)}
                    >
                      <div className="aspect-square mb-4 rounded-lg overflow-hidden flex items-center justify-center">
                        <img 
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-auto h-auto max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1 text-center">{sponsor.name}</h3>
                      <p className="text-neutral-400 text-sm text-center">{sponsor.category}</p>
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Right Button */}
              <button
                ref={nextRef}
                className="
                  absolute
                  right-2 md:-right-12 lg:-right-16
                  top-1/2
                  -translate-y-1/2
                  z-20
                  p-3
                  rounded-full
                  bg-black/60
                  text-gold
                  hover:bg-black/80
                  transition
                "
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
        </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gold">Contact Us</h2>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-top">
            <div className="flex justify-center">
              <img
                src="./Resources/Logos/Bullz Logo_Best.png"
                alt="BULLZ RACING"
                className="h-72 w-auto object-contain"
              />
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="flex items-center space-x-4">
                <Mail className="text-gold w-6 h-6" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:bullzracing@bmsce.ac.in" className="text-silver hover:text-gold transition-colors">
                    bullzracing@bmsce.ac.in
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-gold w-6 h-6" />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:+919008502922" className="text-silver hover:text-gold transition-colors">
                    +91 90085 02922
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-gold w-6 h-6" />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-silver">
                    Platinum Jubilee Block<br />
                    B M S College of Engineering<br />
                    Bull Temple Road, Basavanagudi<br />
                    Bengaluru - 560019
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Become Partners!</h3>
              <p className="text-silver leading-relaxed">
                BULLZ RACING is always looking for partners to support us as we push the boundaries
                of engineering.
              </p>
              <p className="text-silver leading-relaxed">
                We invite you to join us, and help fuel our future in motorsport.
              </p>
              <h3 className="text-2xl font-bold text-white mb-6">Follow us on our Socials!</h3>
              <div className="flex items-center space-x-6">
                <a
                  href="https://instagram.com/bullzracing_bmsce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="text-gold w-10 h-10" />
                </a>
                <a
                  href="https://in.linkedin.com/company/bullzracing-bmsce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-gold w-10 h-10" />
                </a>
                <a
                  href="https://www.facebook.com/bullzracing.bmsce/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="text-gold w-10 h-10" />
                </a>
                <a
                  href="https://www.youtube.com/@BullzRacingBMSCE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="text-gold w-10 h-10" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selectedAchievement !== null && (
          <Modal isOpen={true} onClose={() => setSelectedAchievement(null)}>
            <motion.div
              className="space-y-6 relative p-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button in Top-Right */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ✕
              </button>

              <h3 className="text-3xl font-bold text-gold">
                {achievements[selectedAchievement].title}
              </h3>
              <p className="text-xl text-white">
                {achievements[selectedAchievement].event} • {achievements[selectedAchievement].year}
              </p>
              <p className="text-silver">
                {achievements[selectedAchievement].description}
              </p>

              {/* Points List */}
              <ul className="text-silver space-y-1">
                {achievements[selectedAchievement].points?.map((point, index) => (
                  <li key={index} className="text-lg">
                    <strong>{point.name}:</strong> {point.score}
                  </li>
                ))}
              </ul>

              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {achievements[selectedAchievement].images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Achievement ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Enlarged"
            className="w-auto max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      )}


      {/* Car Modal */}
      <AnimatePresence>
        {selectedCar !== null && (
          <Modal isOpen={true} onClose={() => setSelectedCar(null)}>
            <motion.div
              className="space-y-6 relative p-4"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button in Top-Right */}
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                ✕
              </button>

              <h3 className="text-3xl font-bold text-gold drop-shadow-[8px_8px_10px_rgba(0,0,0,1)]">
                {cars[selectedCar].name}
              </h3>
              <p className="text-xl text-white drop-shadow-lg">
                {cars[selectedCar].specs}
              </p>
              <p className="text-silver drop-shadow-lg">
                {cars[selectedCar].description}
              </p>

              {/* Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cars[selectedCar].images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Car ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>

              {/* Technical Specifications */}
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-white mb-4">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-gold font-medium">Powertrain</p>
                    <p className="text-silver">{cars[selectedCar].details.powertrain}</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-gold font-medium">Power Output</p>
                    <p className="text-silver">{cars[selectedCar].details.power}</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-gold font-medium">Acceleration</p>
                    <p className="text-silver">{cars[selectedCar].details.acceleration}</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <p className="text-gold font-medium">Weight</p>
                    <p className="text-silver">{cars[selectedCar].details.weight}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      <Modal isOpen={!!selectedSponsor} onClose={() => setSelectedSponsor(null)}>
        {selectedSponsor && (
          <div className="p-6 relative bg-black rounded-lg text-left">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSponsor(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              ✕
            </button>

            {/* Sponsor Logo */}
            <div className="mb-4">
              <img
                src={selectedSponsor.logo}
                alt={selectedSponsor.name}
                className="w-auto h-auto max-w-80% max-h-[250px] object-contain opacity-100 transition-opacity"
              />
            </div>

            {/* Sponsor Info */}
            <h2 className="text-2xl font-bold text-white mb-2">{selectedSponsor.name}</h2>
            <p className="text-amber-500 mb-4">{selectedSponsor.category}</p>
            <p className="text-neutral-300 mb-6">{selectedSponsor.description}</p>

            {/* Website Link */}
            <div>
              <a
                href={selectedSponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-amber-500 hover:text-amber-400"
              >
                <span>Visit Website</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        )}
      </Modal>


    </div>
  );
}

export default App;
