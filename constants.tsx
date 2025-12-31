import React from 'react';

export const RESTRICTED_KEYWORDS = [
 // --- PREVIOUS LIST (Updated) ---


// Communication (Expanded)
'email', 'mail', 'gmail', 'yahoo', 'hotmail', 'outlook', 'phone', 'number', 'mobile',  'call', 'video call', 'whatsapp', 'skype', 'zoom', 'telegram', 'facebook', 'fb', 'messenger', 'contact',  'signal', 'wechat', 'viber', 'slack', 'google meet', 'teams', 'anydesk', 'discord', 'linkedin', 'twitter', 'x.com', 'snapchat', 'instagram', 

// Payment & Money (Expanded)
'pay', 'payment', 'paid', 'pricing', 'price', 'money', 'dollar', 'euro', 'gbp', 'bank', 'transfer', 'wise', 'payoneer', 'paypal', 'commission', 'fee', 'tip', 'cash', 'wallet', 'crypto', 'bitcoin', 'btc', 'usdt', 'eth', 'binance', 'coinbase', 'venmo', 'zelle', 'cashapp', 'revolut', 'stripe', 'western union', 'billing', 'invoice', 'budget', 'cost', 'charge', 'subscription', 'donation',

// Feedback & Reviews (Manipulation is banned)
'5 star', 'five star', 'review', 'rating',  'yelp', 'trustpilot', 'endorsement', 'recommendation',

// Academic & School (STRICTLY PROHIBITED)
'homework', 'assignment', 'exam', 'quiz', 'test', 'university', 'college', 'school', 'grade', 'class', 'course', 'essay', 'thesis', 'dissertation', 'research paper', 'proposal', 'student', 'canvas', 'blackboard', 'moodle', 'portal', 'admission', 'academic', 'write my paper', 'do my homework',

// Personal Info & Documents
'cv','id card', 'passport', 'driving license', 'kyc',

// Prohibited Services & Others
'domain', 'hosting', 'login', 'credentials', 'password', 'bot', 'scraping', 'traffic', 'adsense', 'subscribers', 'followers', 'likes', 'seo', 'hack', 'hacking', 'phishing', 'malware', 'spyware', 'ransomware', 'ddos', 'piracy', 'torrent', 'illegal', 'banned', 'prohibited', 'restricted'
];

export const ICONS = {
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
    </svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
    </svg>
  )
};
