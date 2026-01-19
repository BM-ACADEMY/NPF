// src/data/download.js

export const downloadData = {
  en: {
    title: "Download",
    highlight: "Certificate",
    subtitle: "Please enter your registered mobile number to securely verify and download your official membership card.",
    placeholder: "Enter 10-digit Phone Number",
    button: "Download Certificate",
    processing: "Processing...",
    footer: "Official Federation Portal",
    errors: {
      invalid: "Please enter a valid 10-digit phone number.",
      notFound: "Membership not found or not approved.",
      notApproved: "Membership not approved yet.",
      server: "Something went wrong. Try again later.",
      digitLimit: "Phone number must be 10 digits."
    },
    success: "Download completed successfully!"
  },
  ta: {
    title: "சான்றிதழ்",
    highlight: "பதிவிறக்கம்",
    subtitle: "உங்கள் அதிகாரப்பூர்வ உறுப்பினர் அட்டையை சரிபார்த்து பதிவிறக்கம் செய்ய, பதிவு செய்யப்பட்ட மொபைல் எண்ணை உள்ளிடவும்.",
    placeholder: "10 இலக்க மொபைல் எண்ணை உள்ளிடவும்",
    button: "பதிவிறக்கம் செய்",
    processing: "செயலாக்கப்படுகிறது...",
    footer: "அதிகாரப்பூர்வ கூட்டமைப்பு தளம்",
    errors: {
      invalid: "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்.",
      notFound: "உறுப்பினர் பதிவு காணப்படவில்லை அல்லது அங்கீகரிக்கப்படவில்லை.",
      notApproved: "இன்னும் அங்கீகரிக்கப்படவில்லை.",
      server: "ஏதோ தவறு நடந்துவிட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.",
      digitLimit: "தொலைபேசி எண் 10 இலக்கங்களாக இருக்க வேண்டும்."
    },
    success: "பதிவிறக்கம் வெற்றிகரமாக முடிந்தது!"
  }
};
