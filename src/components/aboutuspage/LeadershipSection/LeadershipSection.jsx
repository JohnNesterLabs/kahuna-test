import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import BioModal from './BioModal';
import './LeadershipSection.css';

// Leadership team data with images from public folder
// Order: Top row (4 cards), Bottom row (3 cards)
// Top Row: Sanjeev, John, Gurmeet, Judith
// Bottom Row: Hitesh, Chaitanya, Sudhamsh
const leadershipTeam = [
  {
    id: 1,
    name: 'Sanjeev Gupta',
    role: 'CEO',
    image: '/team/Sanjeev Gupta.png',
    linkedInUrl: 'https://www.linkedin.com/in/sanjeev/',
    bio: [
      "Sanjeev is a seasoned enterprise software executive with over 25 years of experience building and scaling large, complex systems. He co-founded Kahuna Labs drawing on his deep background in customer experience, product innovation and go-to-market strategy. Prior to that, he led New Product Introduction at Palo Alto Networks, where his team launched 200+ new offerings—including the integration of 14 acquisitions—across the company's product portfolio.",
      "Earlier in his career, Sanjeev was part of several high-growth enterprise software companies, including Model N and Castlight Health, both of which went public during his tenure. He also led Global Customer Solutions at Google, driving adoption and success for large-scale enterprise deployments.",
      "Sanjeev holds an MBA from IIM Lucknow and a B.Tech in Computer Science from IIT Delhi."
    ],
  },
  {
    id: 2,
    name: 'John Ragsdale',
    role: 'SVP, Marketing',
    image: '/team/John Ragsdale.png',
    linkedInUrl: 'https://www.linkedin.com/in/jkragsdale/',
    bio: [
      "John is a preeminent thought leader and strategic authority in technical support technology ecosystems. With over two decades at the industry's forefront, his perspective is one of unparalleled depth: forged from running support centers and leading product strategy at major CRM vendors, and sharpened during his influential tenure as a leading analyst at Forrester and TSIA.",
      "John now advises and influences our mission to radically transform technical support. He applies the strategic vision gained from his work with hundreds of global service leaders to architect an AI-infused, high-performance, future-state support model that defines a new standard for technology services excellence."
    ],
  },
  {
    id: 3,
    name: 'Gurmeet Singh Manku',
    role: 'Chief AI Officer',
    image: '/team/Gurmeet.png',
    linkedInUrl: 'https://www.linkedin.com/in/gurmeetsinghmanku/',
    bio: [
      "Gurmeet Singh Manku is Co-founder and Chief AI Officer at Kahuna Labs. He holds a Ph.D. in Computer Science from Stanford University, an M.S. in Computer Science from UC Berkeley, and a B. Tech. in Computer Science from the Indian Institute of Technology, Delhi.",
      "With over 18 years at Google Research and Engineering and 2 years at IBM Research, Gurmeet brings a unique blend of skills in systems infrastructure and machine learning. He is the author of more than 20 research papers published in top-tier conferences, and one of his research papers on data stream analysis, published in 2002, received the VLDB Ten Year Best Paper Award in 2012.",
      "His expertise includes data stream analysis, planetary scale data management & workflows, machine learning, reinforcement learning, and Large Language Models (LLMs) for real-world applications. His favorite project at Google was the design and implementation of a conversational shopping engine.",
      "Gurmeet is particularly fascinated by modern advancements in LLMs and Agentic AI for real-world applications. In 2023, he co-founded Kahuna Labs, where he is leading the development of an autonomous customer support system utilizing modern AI technologies."
    ],
  },
  {
    id: 4,
    name: 'Judith Platz',
    role: 'Field Chief Customer Officer',
    image: '/team/Judith.png',
    linkedInUrl: 'https://www.linkedin.com/in/judithaplatz/',
    bio: [
      "Judith Platz is a widely respected industry authority and strategic leader in customer experience, support operations, and post-sales transformation. With more than two decades shaping the future of customer success and technical support, her expertise is uniquely multidimensional; built from leading global support and customer success organizations, driving product and customer strategy at high-growth SaaS companies, and advising some of the world's most recognizable enterprise brands.",
      "Judith's leadership perspective has been forged through hands-on executive roles spanning Customer Success, Support, Services, Product, and Experience, including senior leadership positions at organizations such as TSIA, Salesforce, Mulesoft, and SupportLogic. She has guided organizations through massive scale, operational redesign, and the integration of AI, predictive insights, and experience-led design. Throughout her career, she has partnered with hundreds of CX and support executives across industries, helping them modernize operations, elevate customer value, and build more intelligent, proactive engagement models.",
      "Today, Judith applies this depth of experience to shaping the next era of customer and product excellence. She is a vocal advocate for unifying customer understanding, operational execution, and product strategy; empowering companies to build AI-driven, high-performance ecosystems where customer insight fuels innovation. Her work will influence how modern enterprises design, scale, and deliver exceptional experiences across the entire customer journey."
    ],
  },
  {
    id: 5,
    name: 'Hitesh Sharma',
    role: 'VP, Engineering',
    image: '/team/Hitesh.png',
    linkedInUrl: 'https://www.linkedin.com/in/hitesh-sharma-712a88/',
    bio: [
      "Hitesh builds engineering teams that thrive at the intersection of scale, performance, and innovation. With more than two decades of experience leading platform and infrastructure development at Cohesity, Datrium, and NetApp, he's helped deliver technologies that protect and move the world's data — reliably and at massive scale – and powered hundreds of millions in enterprise revenue.",
      "At Kahuna Labs, Hitesh brings that same rigor and curiosity to the world of AI infrastructure. He believes that building great technology starts with empowering great people — and that thoughtful engineering can make complex AI systems not just faster, but smarter and more trustworthy.",
      "Hitesh holds a B.Tech. in Computer Science and Engineering from IIT Delhi."
    ],
  },
  {
    id: 6,
    name: 'Chaitanya Potluri',
    role: 'Co-Founder',
    image: '/team/Chaitanya.png',
    linkedInUrl: 'https://www.linkedin.com/in/cpotluri/',
    bio: [
      "Chaitanya focuses on dependable AI systems that deliver value to frontline teams. At Kahuna Labs his work centers on engineering the last mile where AI collaborates with people, learns from feedback, and steadily improves outcomes.",
      "Previously he led data platform and engineering at Keystone, partnering with leading technology companies on complex problems involving large-scale data. Before that he worked in research at Carnegie Mellon University.",
      "Co-founding Kahuna has reinforced his belief that the future of frontline productivity lies in systems that surface the right context at the right moment, listen before they act, and close the loop in ways that are easy to verify. Chaitanya holds a master's degree in Information Systems from Carnegie Mellon University and a bachelor's in Electronics Engineering from the National Institute of Technology, Surat."
    ],
  },
  {
    id: 7,
    name: 'Sudhamsh Goutham Teegala',
    role: 'Founding Principal Engineer',
    image: '/team/Sudhamsh.png',
    linkedInUrl: 'https://www.linkedin.com/in/sudhamshgoutham/',
    bio: [
      "Goutham builds systems with the conviction that architecture is destiny. As an architect and founding engineer, he brings a builder's instinct for clarity, scalability, and long-term leverage to the core of the product. His work centers on turning complex, ambiguous problems into clean, dependable systems that make AI genuinely useful.",
      "He co-founded Mobolt, serving as the principal architect behind the platform that led to its acquisition by Indeed. At Indeed, Goutham helped shape the India engineering office before moving to the United States, where he led multiple engineering teams and managers. He bootstrapped new internal and user-facing products, improved large-scale platforms, and guided the evolution of Indeed's Homepage experience."
    ],
  },
];

const LeadershipSection = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleBioClick = (leader) => {
    setSelectedLeader(leader);
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLeader(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="leadership">
      {/* Background Gradients */}
      <div className="leadership__bg-left" />
      <div className="leadership__bg-right" />

      {/* Content */}
      <div className="leadership__content">
        {/* Header */}
        <div className="leadership__header">
          <span className="leadership__tag">Our Leadership</span>
          <h2 className="leadership__title">
            {isMobile ? (
              <>
                <span>Passionate for </span> <br />
                <span>Making the Frontline</span> <br />
                <span>Productivity Leap</span>
              </>
            ) : (
              <>
                <span>Passionate for Making</span> <br />
                <span>the Frontline Productivity Leap</span>
              </>
            )}
          </h2>
        </div>

        {/* Cards */}
        <div className="leadership__cards">
          {/* Row 1 - 4 cards */}
          <div className="leadership__row leadership__row--first">
            {leadershipTeam.slice(0, 4).map((leader) => (
              <ProfileCard
                key={leader.id}
                name={leader.name}
                role={leader.role}
                image={leader.image}
                linkedInUrl={leader.linkedInUrl}
                onBioClick={() => handleBioClick(leader)}
              />
            ))}
          </div>

          {/* Row 2 - 3 cards */}
          <div className="leadership__row leadership__row--second">
            {leadershipTeam.slice(4, 7).map((leader) => (
              <ProfileCard
                key={leader.id}
                name={leader.name}
                role={leader.role}
                image={leader.image}
                linkedInUrl={leader.linkedInUrl}
                onBioClick={() => handleBioClick(leader)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bio Modal */}
      <BioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        leader={selectedLeader}
      />
    </section>
  );
};

export default LeadershipSection;

