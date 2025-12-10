/**
 * Privacy Policy Content Constants
 * Centralized content for easy maintenance and updates
 */
import React from 'react';

export const PRIVACY_POLICY_CONFIG = {
  lastUpdated: 'November 28, 2025',
  contactEmail: 'info@kahunalabs.ai',
  companyName: 'Kahuna Labs Inc.',
  websiteUrl: 'https://www.kahunalabs.ai',
  mailingAddress: {
    company: 'Kahuna Labs Inc.',
    department: 'Data Protection Officer',
    street: '1731 Technology Dr Suite 670',
    city: 'San Jose, CA 95110',
    country: 'United States'
  }
};

export const PRIVACY_POLICY_SECTIONS = [
  {
    id: 'intro',
    content: (
      <>
        <p>
          This Privacy Notice for Kahuna Labs Inc. ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
        </p>
        <ul>
          <li>Visit our website at https://www.kahunalabs.ai or any website of ours.</li>
          <li>Use Kahuna AI. Kahuna AI provides contextual intelligence to help troubleshoot complex technical support issues.</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
        </ul>
      </>
    )
  },
  {
    id: 'questions',
    title: 'Questions or Concerns?',
    content: (
      <p>
        If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at {PRIVACY_POLICY_CONFIG.contactEmail}.
      </p>
    )
  },
  {
    id: 'information-collect',
    title: '1. What Information do we Collect?',
    content: (
      <p>
        We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
      </p>
    )
  },
  {
    id: 'personal-information',
    title: '2. Personal Information Provided by You',
    content: (
      <>
        <p>
          The personal information that we collect depends on the context of your interactions with us and the services, and the choices you make. The personal information we collect when you use our website may include the following:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Company name</li>
        </ul>
      </>
    )
  },
  {
    id: 'kahuna-ai-info',
    title: '3. Information when you use Kahuna AI',
    content: (
      <p>
        Kahuna AI is deployed within our customer network, and we do not import any of the information into Kahuna Labs. We do not collect your data or personal information that is provided to Kahuna AI within your network.
      </p>
    )
  },
  {
    id: 'sensitive-information',
    title: '4. Sensitive Information',
    content: (
      <>
        <p>We do not process sensitive information.</p>
        <p>
          All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
        </p>
      </>
    )
  },
  {
    id: 'auto-collected',
    title: '5. Information Automatically Collected',
    content: (
      <>
        <p>
          We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, and other technical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.
        </p>
        <p>
          We do not collect any usage information into Kahuna Labs when you use Kahuna AI deployed within your network.
        </p>
      </>
    )
  },
  {
    id: 'process-information',
    title: '6. How do we Process Your Information?',
    content: (
      <p>
        We may process your information to respond to your inquiries, and for marketing purposes.
      </p>
    )
  },
  {
    id: 'legal-bases',
    title: '7. What Legal Bases do we Rely on to Process Your Information?',
    content: (
      <p>
        We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
      </p>
    )
  },
  {
    id: 'share-information',
    title: '8. When and with Whom do we Share Your Personal Information?',
    content: (
      <>
        <p>We may need to share your personal information in the following situations:</p>
        <ul>
          <li>
            Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
          </li>
        </ul>
      </>
    )
  },
  {
    id: 'kahuna-ai',
    title: '9. Kahuna AI',
    content: (
      <p>
        Kahuna AI is privately deployed within our customers' network, and no data from Kahuna AI is brought back to Kahuna Labs. Any and all data that Kahuna AI, or Kahuna Labs' forward-deployed engineers have access to, stays within our customers' network.
      </p>
    )
  },
  {
    id: 'updates',
    title: '10. Do we Make Updates to this Notice?',
    content: (
      <p>
        We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
      </p>
    )
  },
  {
    id: 'contact',
    title: '11. How Can You Contact Us About this Notice?',
    content: (
      <>
        <p>
          If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at {PRIVACY_POLICY_CONFIG.contactEmail}, or contact us by mail at:
        </p>
        <p>
          {PRIVACY_POLICY_CONFIG.mailingAddress.company}<br/>
          {PRIVACY_POLICY_CONFIG.mailingAddress.department}<br/>
          {PRIVACY_POLICY_CONFIG.mailingAddress.street}<br/>
          {PRIVACY_POLICY_CONFIG.mailingAddress.city}<br/>
          {PRIVACY_POLICY_CONFIG.mailingAddress.country}
        </p>
      </>
    )
  }
];
