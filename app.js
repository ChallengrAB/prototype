// app.js
// Contains dummy data and dynamic functionality of the prototype.
const { createApp, ref } = Vue;

createApp({
  setup() {
    const activeTab = ref('feed');
    const showCreateChallenge = ref(false);
    const showAcceptChallenge = ref(false);
    const showShareChallenge = ref(false);
    const showSubmitProof = ref(false);
    const selectedChallenge = ref({});
    
    const newChallenge = ref({
      title: '',
      description: '',
      type: 'fitness',
      rewardType: 'fiat',
      rewardAmount: 100,
      verification: 'photo',
      duration: 7,
      challengedUser: '',
      noPayment: false,
      difficulty: 'medium',
      selectedTags: []
    });        

    const availableTags = ref([
      'fitness', 'learning', 'creativity', 'social', 'eco', 
      'wellness', 'mindfulness', 'cooking', 'reading', 'productivity',
      'outdoor', 'tech', 'art', 'music', 'language'
    ]);

    const challenges = ref([
      {
        user: 'SarahFit',
        timestamp: '2 hours ago',
        title: 'Complete 30 pushups every day for a week',
        description: 'Challenge yourself to do 30 pushups daily for 7 days straight. Record your progress!',
        tags: ['fitness', 'strength'],
        reward: '0.005 ETH',
        likes: 24,
        duration: 7,
        challengedUser: 'JohnFitness'
      },
      {
        user: 'BookWorm',
        timestamp: '5 hours ago',
        title: 'Read a book in 48 hours',
        description: 'Pick any book of at least 200 pages and finish it within 48 hours. Share your insights!',
        tags: ['reading', 'personal'],
        reward: '$15',
        likes: 18,
        duration: 2,
        challengedUser: ''
      },
      {
        user: 'EcoWarrior',
        timestamp: '1 day ago',
        title: 'Plastic-free grocery shopping',
        description: 'Complete your weekly grocery shopping without bringing home any single-use plastic.',
        tags: ['eco', 'lifestyle'],
        reward: '0.002 ETH',
        likes: 42,
        duration: 3,
        challengedUser: 'GreenLiving'
      },
      {
        user: 'CodeMaster',
        timestamp: '2 days ago',
        title: 'Build a simple web app in 24 hours',
        description: 'Create and deploy a simple web application within 24 hours. Any language allowed!',
        tags: ['coding', 'tech'],
        reward: '$50',
        likes: 31,
        duration: 1,
        challengedUser: 'MikeCode'
      }
    ]);
    
    const myChallenges = ref([
      {
        user: 'You',
        timestamp: '1 day ago',
        title: 'Take a cold shower for 7 days',
        description: 'Start your day with a cold shower every morning for a week.',
        tags: ['wellness', 'discipline'],
        reward: 'None (Free Challenge)',
        likes: 5,
        status: 'active',
        duration: 7
      },
      {
        user: 'You',
        timestamp: '3 days ago',
        title: 'Meditate for 10 minutes daily',
        description: 'Complete a 10-minute meditation session every day for 5 days.',
        tags: ['mindfulness', 'wellness'],
        reward: '0.001 ETH',
        likes: 8,
        status: 'pending',
        duration: 5
      },
      {
        user: 'You',
        timestamp: '1 week ago',
        title: 'Learn 20 new vocabulary words',
        description: 'Learn and use 20 new words in your daily conversations within 7 days.',
        tags: ['learning', 'language'],
        reward: '$10',
        likes: 12,
        status: 'complete',
        duration: 7
      }
    ]);

    function togglePayment() {
      if (newChallenge.value.noPayment) {
        newChallenge.value.rewardAmount = 0;
      } else {
        newChallenge.value.rewardAmount = newChallenge.value.rewardType === 'fiat' ? 100 : 0.01;
      }
    }

    function toggleTag(tag) {
      const index = newChallenge.value.selectedTags.indexOf(tag);
      if (index === -1) {
        if (newChallenge.value.selectedTags.length < 3) {
          newChallenge.value.selectedTags.push(tag);
        }
      } else {
        newChallenge.value.selectedTags.splice(index, 1);
      }
    }
    
    function createChallenge() {
      let rewardText;
      if (newChallenge.value.noPayment) {
        rewardText = 'None (Just for fun!)';
      } else if (newChallenge.value.rewardType === 'crypto') {
        rewardText = `${newChallenge.value.rewardAmount} ETH`;
      } else {
        rewardText = `${newChallenge.value.rewardAmount} kr`;
      }
      
      challenges.value.unshift({
        user: 'You',
        timestamp: 'Just now',
        title: newChallenge.value.title,
        description: newChallenge.value.description,
        tags: newChallenge.value.selectedTags.length > 0 ? 
              newChallenge.value.selectedTags : 
              [newChallenge.value.type],
        reward: rewardText,
        likes: 0,
        duration: newChallenge.value.duration,
        challengedUser: newChallenge.value.challengedUser,
        difficulty: newChallenge.value.difficulty
      });
      
      showCreateChallenge.value = false;
      
      newChallenge.value = {
        title: '',
        description: '',
        type: 'fitness',
        rewardType: 'fiat',
        rewardAmount: 100,
        verification: 'photo',
        duration: 7,
        challengedUser: '',
        noPayment: false,
        difficulty: 'medium',
        selectedTags: []
      };
      
      alert('Challenge created successfully!');
    }

    
    function acceptChallenge(challenge) {
      selectedChallenge.value = challenge;
      showAcceptChallenge.value = true;
    }
    
    function confirmAcceptChallenge() {
      myChallenges.value.unshift({
        ...selectedChallenge.value,
        status: 'active',
        timestamp: 'Just now'
      });
      
      showAcceptChallenge.value = false;
      alert('Challenge accepted! Good luck!');
    }
    
    function shareChallenge(challenge) {
      selectedChallenge.value = challenge;
      showShareChallenge.value = true;
    }
    
    function submitProof(challenge) {
      selectedChallenge.value = challenge;
      showSubmitProof.value = true;
    }
    
    function confirmSubmitProof() {
      const index = myChallenges.value.findIndex(c => c.title === selectedChallenge.value.title);
      if (index !== -1) {
        myChallenges.value[index].status = 'pending';
      }
      
      showSubmitProof.value = false;
      alert('Proof submitted! Waiting for verification.');
    }
    
    return {
      activeTab,
      challenges,
      myChallenges,
      showCreateChallenge,
      showAcceptChallenge,
      showShareChallenge,
      showSubmitProof,
      selectedChallenge,
      newChallenge,
      createChallenge,
      acceptChallenge,
      confirmAcceptChallenge,
      shareChallenge,
      submitProof,
      confirmSubmitProof
    };
  }
}).mount('#app');
