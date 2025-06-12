// Metacces Smart Contracts Architecture Data
const contractsData = {
  // Main system categories
  categories: {
    admin: { name: 'Admin & Core', color: '#ff6b6b', count: 0 },
    skins: { name: 'OLI Skins', color: '#4ecdc4', count: 0 },
    user: { name: 'User Account', color: '#45b7d1', count: 0 },
    tokens: { name: 'Token Systems', color: '#f9ca24', count: 0 },
    social: { name: 'Social Systems', color: '#f0932b', count: 0 },
    utils: { name: 'Utilities', color: '#eb4d4b', count: 0 }
  },

  // Interface definitions - Complete list from contracts directory
  interfaces: [
    // Standard ERC Interfaces (distributed by usage)
    {
      id: 'ierc1155',
      name: 'IERC1155',
      category: 'skins',
      type: 'interface',
      description: 'ERC1155 Multi-Token Standard interface',
      functions: ['balanceOf', 'balanceOfBatch', 'setApprovalForAll', 'isApprovedForAll', 'safeTransferFrom', 'safeBatchTransferFrom'],
      implementedBy: ['oli-skins']
    },
    {
      id: 'ierc20',
      name: 'IERC20',
      category: 'tokens',
      type: 'interface',
      description: 'ERC20 Token Standard interface',
      functions: ['totalSupply', 'balanceOf', 'transfer', 'allowance', 'approve', 'transferFrom'],
      implementedBy: ['wrapped-acces', 'blacxes', 'acces-xp']
    },
    {
      id: 'ierc721',
      name: 'IERC721',
      category: 'tokens',
      type: 'interface',
      description: 'ERC721 Non-Fungible Token Standard interface',
      functions: ['balanceOf', 'ownerOf', 'approve', 'getApproved', 'setApprovalForAll', 'isApprovedForAll', 'transferFrom', 'safeTransferFrom'],
      implementedBy: ['oli-nft']
    },

    // Admin System Interfaces
    {
      id: 'iadmin-manager',
      name: 'IAdminManager',
      category: 'admin',
      type: 'interface',
      description: 'Admin role management interface',
      functions: ['grantAdminRole', 'revokeAdminRole', 'hasAdminRole', 'pauseContract', 'unpauseContract'],
      implementedBy: ['admin-manager']
    },
    {
      id: 'iacces-contracts-manager',
      name: 'IAccesContractsManager',
      category: 'admin',
      type: 'interface',
      description: 'Contract registry management interface',
      functions: ['setContract', 'getContract', 'removeContract', 'getAllContractNames', 'isContract'],
      implementedBy: ['acces-contracts-manager']
    },
    {
      id: 'iacces-withdraw-validator',
      name: 'IAccesWithdrawValidator',
      category: 'admin',
      type: 'interface',
      description: 'Withdrawal validation interface',
      functions: ['validateWithdrawal', 'setWithdrawalLimits', 'checkWithdrawalRules', 'approveWithdrawal'],
      implementedBy: ['acces-withdraw-validator']
    },
    {
      id: 'iregistered-wallets',
      name: 'IRegisteredWallets',
      category: 'admin',
      type: 'interface',
      description: 'Wallet registration interface',
      functions: ['registerWallet', 'deregisterWallet', 'isWalletRegistered'],
      implementedBy: ['registered-wallets']
    },
    {
      id: 'iacces-data-manager',
      name: 'IAccesDataManager',
      category: 'admin',
      type: 'interface',
      description: 'Data management interface',
      functions: ['storeData', 'retrieveData', 'updateData', 'deleteData', 'setDataPermissions'],
      implementedBy: ['acces-data-manager']
    },

    // OLI Skins System Interfaces
    {
      id: 'ioli-skins',
      name: 'IOLISkins',
      category: 'skins',
      type: 'interface',
      description: 'OLI Skins NFT system interface',
      functions: ['mint', 'burn', 'batchMint', 'batchBurn', 'getUserOwnedTokens', 'getTokenInfo'],
      implementedBy: ['oli-skins']
    },
    {
      id: 'iskins-tools',
      name: 'ISkinsTools',
      category: 'skins',
      type: 'interface',
      description: 'Skins tools management interface',
      functions: ['createTool', 'updateTool', 'setToolProperties', 'getToolInfo', 'upgradeToolLevel'],
      implementedBy: ['skins-tools']
    },
    {
      id: 'iskins-marketplace',
      name: 'ISkinsMarketplace',
      category: 'skins',
      type: 'interface',
      description: 'Skins marketplace interface',
      functions: ['createListing', 'cancelListing', 'purchaseSkin', 'createAuction', 'placeBid'],
      implementedBy: ['skins-marketplace']
    },
    {
      id: 'iskins-purchase-rules',
      name: 'ISkinsPurchaseRules',
      category: 'skins',
      type: 'interface',
      description: 'Purchase validation rules interface',
      functions: ['setPurchaseRules', 'validatePurchase', 'checkEligibility', 'applyDiscounts'],
      implementedBy: ['skins-purchase-rules']
    },
    {
      id: 'iskins-first-purchase',
      name: 'ISkinsFirstPurchase',
      category: 'skins',
      type: 'interface',
      description: 'First purchase tracking interface',
      functions: ['recordFirstPurchase', 'isFirstPurchase', 'getFirstPurchaseBonus'],
      implementedBy: ['skins-first-purchase']
    },
    {
      id: 'iskins-rewards',
      name: 'ISkinsRewards',
      category: 'skins',
      type: 'interface',
      description: 'Rewards distribution interface',
      functions: ['distributeRewards', 'claimRewards', 'getRewardBalance', 'setRewardRules'],
      implementedBy: ['skins-rewards']
    },
    {
      id: 'iskins-gift',
      name: 'ISkinsGift',
      category: 'skins',
      type: 'interface',
      description: 'Gift system interface',
      functions: ['sendGift', 'acceptGift', 'rejectGift', 'getGiftHistory'],
      implementedBy: ['skins-gift']
    },
    {
      id: 'iskins-features',
      name: 'ISkinsFeatures',
      category: 'skins',
      type: 'interface',
      description: 'Skins features management interface',
      functions: ['addFeature', 'removeFeature', 'updateFeature', 'getFeatures'],
      implementedBy: ['skins-features']
    },
    {
      id: 'iskins-equip',
      name: 'ISkinsEquip',
      category: 'skins',
      type: 'interface',
      description: 'Skins equipment interface',
      functions: ['equipSkin', 'unequipSkin', 'getEquippedSkins', 'canEquip'],
      implementedBy: ['skins-equip']
    },
    {
      id: 'iskins-boxes',
      name: 'ISkinsBoxes',
      category: 'skins',
      type: 'interface',
      description: 'Loot boxes interface',
      functions: ['openBox', 'createBox', 'getBoxContents', 'purchaseBox'],
      implementedBy: ['skins-boxes']
    },
    {
      id: 'iskins-season',
      name: 'ISkinsSeason',
      category: 'skins',
      type: 'interface',
      description: 'Seasonal content interface',
      functions: ['createSeason', 'updateSeason', 'activateSeason', 'getCurrentSeason'],
      implementedBy: ['skins-season']
    },
    {
      id: 'iskins-collection',
      name: 'ISkinsCollection',
      category: 'skins',
      type: 'interface',
      description: 'Collections management interface',
      functions: ['createCollection', 'updateCollection', 'addSkinToCollection', 'getCollectionSkins'],
      implementedBy: ['skins-collection']
    },
    {
      id: 'iskins-category',
      name: 'ISkinsCategory',
      category: 'skins',
      type: 'interface',
      description: 'Category management interface',
      functions: ['createCategory', 'updateCategory', 'assignSkinCategory', 'getCategorySkins'],
      implementedBy: ['skins-category']
    },
    {
      id: 'iskins-tasks',
      name: 'ISkinsTasks',
      category: 'skins',
      type: 'interface',
      description: 'Task system interface',
      functions: ['createTask', 'completeTask', 'getTaskProgress', 'claimTaskReward'],
      implementedBy: ['skins-tasks']
    },
    {
      id: 'iskins-creator',
      name: 'ISkinsCreator',
      category: 'skins',
      type: 'interface',
      description: 'Skins creation interface',
      functions: ['createSkin', 'updateSkinMetadata', 'setSkinRarity', 'approveSkin'],
      implementedBy: ['skins-creator']
    },

    // User Account System Interfaces
    {
      id: 'iuser-creator-multisig',
      name: 'IUserCreatorMultisig',
      category: 'user',
      type: 'interface',
      description: 'User creator multisig interface',
      functions: ['createUser', 'submitTransaction', 'confirmTransaction', 'executeTransaction'],
      implementedBy: ['user-creator-multisig']
    },
    {
      id: 'iuser-account-multisig',
      name: 'IUserAccountMultisig',
      category: 'user',
      type: 'interface',
      description: 'User account multisig interface',
      functions: ['submitTransaction', 'confirmTransaction', 'executeTransaction', 'revokeConfirmation'],
      implementedBy: ['user-account-multisig']
    },
    {
      id: 'iuser-profile-manager',
      name: 'IUserProfileManager',
      category: 'user',
      type: 'interface',
      description: 'User profile management interface',
      functions: ['createProfile', 'updateProfile', 'getProfile', 'deleteProfile'],
      implementedBy: ['user-profile-manager']
    },
    {
      id: 'iuser-wallet-manager',
      name: 'IUserWalletManager',
      category: 'user',
      type: 'interface',
      description: 'Wallet management interface',
      functions: ['addWallet', 'removeWallet', 'getWallets', 'setDefaultWallet'],
      implementedBy: ['user-wallet-manager']
    },
    {
      id: 'iuser-asset-tracker',
      name: 'IUserAssetTracker',
      category: 'user',
      type: 'interface',
      description: 'Asset tracking interface',
      functions: ['trackAsset', 'getAssetBalance', 'getAssetHistory', 'updateAssetValue'],
      implementedBy: ['user-asset-tracker']
    },
    {
      id: 'iuser-withdrawal-manager',
      name: 'IUserWithdrawalManager',
      category: 'user',
      type: 'interface',
      description: 'Withdrawal management interface',
      functions: ['requestWithdrawal', 'approveWithdrawal', 'executeWithdrawal', 'cancelWithdrawal'],
      implementedBy: ['user-withdrawal-manager']
    },
    {
      id: 'iuser-data-storage',
      name: 'IUserDataStorage',
      category: 'user',
      type: 'interface',
      description: 'User data storage interface',
      functions: ['storeUserData', 'getUserData', 'updateUserData', 'deleteUserData'],
      implementedBy: ['user-data-storage']
    },
    {
      id: 'iuser-id',
      name: 'IUserID',
      category: 'user',
      type: 'interface',
      description: 'User identification interface',
      functions: ['generateNewUserId', 'linkIdToContract', 'getUserIdByAddress', 'getAddressByUserId'],
      implementedBy: ['user-id']
    },
    {
      id: 'iuser-name-registerer',
      name: 'IUserNameRegisterer',
      category: 'user',
      type: 'interface',
      description: 'Username registration interface',
      functions: ['registerUserName', 'editUserName', 'deregisterUserName', 'isUserNameExists'],
      implementedBy: ['user-name-registerer']
    },
    {
      id: 'iuser-name-storage',
      name: 'IUserNameStorage',
      category: 'user',
      type: 'interface',
      description: 'Username storage interface',
      functions: ['storeName', 'getName', 'updateName', 'deleteName'],
      implementedBy: ['user-name-storage']
    },
    {
      id: 'iuser-bio',
      name: 'IUserBio',
      category: 'user',
      type: 'interface',
      description: 'User biography interface',
      functions: ['setBio', 'getBio', 'updateBio', 'setBioPermissions'],
      implementedBy: ['user-bio']
    },
    {
      id: 'iuser-account-manager',
      name: 'IUserAccountManager',
      category: 'user',
      type: 'interface',
      description: 'Account management interface',
      functions: ['createAccount', 'updateAccount', 'deleteAccount', 'getAccountInfo'],
      implementedBy: ['user-account-manager']
    },

    // Token System Interfaces
    {
      id: 'iwrapped-acces',
      name: 'IWrappedAcces',
      category: 'tokens',
      type: 'interface',
      description: 'Wrapped ACCES token interface',
      functions: ['wrap', 'unwrap', 'deposit', 'withdraw', 'totalSupply', 'balanceOf'],
      implementedBy: ['wrapped-acces']
    },
    {
      id: 'iblacxes',
      name: 'IBlacxes',
      category: 'tokens',
      type: 'interface',
      description: 'Blacxes token interface',
      functions: ['mint', 'burn', 'transfer', 'approve', 'balanceOf', 'totalSupply'],
      implementedBy: ['blacxes']
    },
    {
      id: 'iacces-xp',
      name: 'IAccesXP',
      category: 'tokens',
      type: 'interface',
      description: 'Experience points interface',
      functions: ['awardXP', 'spendXP', 'getXPBalance', 'getXPHistory'],
      implementedBy: ['acces-xp']
    },
    {
      id: 'iacces-xp-modal',
      name: 'IAccesXPModal',
      category: 'tokens',
      type: 'interface',
      description: 'XP modal interface',
      functions: ['showXPGain', 'showLevelUp', 'showXPSpent'],
      implementedBy: ['acces-xp-modal']
    },
    {
      id: 'ioli-nft',
      name: 'IOLINFT',
      category: 'tokens',
      type: 'interface',
      description: 'OLI NFT interface',
      functions: ['mint', 'burn', 'tokenURI', 'ownerOf', 'approve', 'transferFrom'],
      implementedBy: ['oli-nft']
    },
    {
      id: 'ioli-activator',
      name: 'IOLIActivator',
      category: 'tokens',
      type: 'interface',
      description: 'OLI activation interface',
      functions: ['activateOLI', 'deactivateOLI', 'isOLIActive', 'getActivationStatus'],
      implementedBy: ['oli-activator']
    },

    // Social System Interfaces
    {
      id: 'iacces-referral',
      name: 'IAccesReferral',
      category: 'social',
      type: 'interface',
      description: 'Referral system interface',
      functions: ['addReferral', 'getReferralTree', 'getReferrer', 'getReferees'],
      implementedBy: ['acces-referral']
    },
    {
      id: 'ifollower-manager',
      name: 'IFollowerManager',
      category: 'social',
      type: 'interface',
      description: 'Social following interface',
      functions: ['follow', 'unfollow', 'getFollowers', 'getFollowing', 'isFollowing'],
      implementedBy: ['follower-manager']
    },

    // Utility System Interfaces
    {
      id: 'iacces-coin-locker',
      name: 'IAccesCoinLocker',
      category: 'utils',
      type: 'interface',
      description: 'ACCES token locking interface',
      functions: ['lockTokens', 'unlockTokens', 'extendLock', 'getLockedAmount', 'getUnlockTime'],
      implementedBy: ['acces-coin-locker']
    },
    {
      id: 'iblacxes-locker',
      name: 'IBlacxesLocker',
      category: 'utils',
      type: 'interface',
      description: 'Blacxes token locking interface',
      functions: ['lockBlacxes', 'unlockBlacxes', 'getStakingRewards', 'claimRewards'],
      implementedBy: ['blacxes-locker']
    },
    {
      id: 'iacces-levels',
      name: 'IAccesLevels',
      category: 'utils',
      type: 'interface',
      description: 'User leveling interface',
      functions: ['setUserLevel', 'getUserLevel', 'calculateLevelRequirements', 'checkLevelUp'],
      implementedBy: ['acces-levels']
    },
    {
      id: 'iacces-migration',
      name: 'IAccesMigration',
      category: 'utils',
      type: 'interface',
      description: 'Contract migration interface',
      functions: ['migrateUser', 'migrateAssets', 'verifyMigration', 'completeMigration'],
      implementedBy: ['acces-migration']
    },

    // Blacklist System Interface
    {
      id: 'iacces-blacklisted-users',
      name: 'IAccesBlacklistedUsers',
      category: 'admin',
      type: 'interface',
      description: 'User blacklist interface',
      functions: ['addToBlacklist', 'removeFromBlacklist', 'isBlacklisted', 'getBlacklistReason'],
      implementedBy: ['acces-blacklisted-users']
    },

    // External Interfaces
    {
      id: 'ignosis-safe',
      name: 'IGnosisSafe',
      category: 'user',
      type: 'interface',
      description: 'Gnosis Safe multisig interface',
      functions: ['execTransaction', 'approveHash', 'getTransactionHash', 'getThreshold'],
      implementedBy: ['user-creator-multisig']
    }
  ],

  // Contract nodes with detailed information
  contracts: [
    // Admin & Core System
    {
      id: 'admin-manager',
      name: 'AdminManager',
      category: 'admin',
      type: 'main-contract',
      address: '0xaD866EA13b38377e53da31b460D1622851C0130F',
      description: 'Advanced hierarchical admin role management system',
      size: 'large',
      functions: [
        'grantAdminRole', 'revokeAdminRole', 'grantBulkAdminRole',
        'hasAdminRole', 'pauseContract', 'unpauseContract',
        'emergencyAction', 'updateAdminInfo', 'getAdminInfo'
      ],
      roles: [
        'SUPER_ADMIN_ROLE', 'OLI_ADMIN_ROLE', 'OLI_SKINS_ADMIN_ROLE',
        'LEVELS_ADMIN_ROLE', 'CREATOR_ADMIN_ROLE', 'ACCOUNT_ADMIN_ROLE',
        'XP_ADMIN_ROLE', 'BLACXES_ADMIN_ROLE', 'MARKETPLACE_ADMIN_ROLE'
      ],
      connections: ['acces-contracts-manager', 'all-contracts']
    },
    {
      id: 'acces-contracts-manager',
      name: 'AccesContractsManager',
      category: 'admin',
      type: 'main-contract',
      address: '0xb7Ad79de0773b17229E627F14e38632DA85aD6c4',
      description: 'Central registry for all system contracts',
      size: 'medium',
      functions: [
        'setContract', 'getContract', 'removeContract',
        'getAllContractNames', 'getAllContractsInfo', 'isContract',
        'addressToName'
      ],
      connections: ['admin-manager', 'all-contracts']
    },
    {
      id: 'acces-withdraw-validator',
      name: 'AccesWithdrawValidator',
      category: 'admin',
      type: 'main-contract',
      address: '0xC74617Cc44e88Af800A63eF39d658D2A1de83F4F',
      description: 'Validates withdrawal operations across the system',
      size: 'medium',
      functions: [
        'validateWithdrawal', 'setWithdrawalLimits', 'checkWithdrawalRules',
        'approveWithdrawal', 'rejectWithdrawal'
      ],
      connections: ['user-withdrawal-manager', 'admin-manager']
    },
    {
      id: 'registered-wallets',
      name: 'RegisteredWallets',
      category: 'admin',
      type: 'main-contract',
      description: 'Manages wallet registration and verification',
      size: 'small',
      functions: [
        'registerWallet', 'deregisterWallet', 'isWalletRegistered'
      ],
      connections: ['user-creator-multisig', 'admin-manager']
    },
    {
      id: 'acces-data-manager',
      name: 'AccesDataManager',
      category: 'admin',
      type: 'main-contract',
      description: 'Manages system-wide data storage and access',
      size: 'large',
      functions: [
        'storeData', 'retrieveData', 'updateData', 'deleteData',
        'setDataPermissions', 'getDataPermissions'
      ],
      connections: ['admin-manager']
    },

    // OLI Skins System (Gaming NFTs)
    {
      id: 'oli-skins',
      name: 'OLISkins',
      category: 'skins',
      type: 'main-contract',
      address: '0xf9D59F5D8A519af26cb1AafCB01f586BC3C7F764',
      description: 'Main ERC1155 contract for OLI Skins NFT system',
      size: 'xlarge',
      functions: [
        'mint', 'burn', 'batchMint', 'batchBurn', 'safeTransferFrom',
        'setApprovalForAll', 'balanceOf', 'balanceOfBatch',
        'getUserOwnedTokens', 'getTokenInfo', 'setBaseURI'
      ],
      connections: [
        'skins-tools', 'skins-marketplace', 'skins-purchase-rules',
        'skins-first-purchase', 'skins-rewards', 'skins-gift',
        'skins-features', 'skins-equip', 'skins-boxes'
      ]
    },
    {
      id: 'skins-season',
      name: 'SkinsSeason',
      category: 'skins',
      type: 'main-contract',
      address: '0x3ac3e464f7E2325c62808F0C213b885ceeD2c11d',
      description: 'Manages seasonal content and releases',
      size: 'medium',
      functions: [
        'createSeason', 'updateSeason', 'activateSeason',
        'deactivateSeason', 'getCurrentSeason', 'getSeasonInfo'
      ],
      connections: ['oli-skins', 'skins-collection', 'skins-tools']
    },
    {
      id: 'skins-collection',
      name: 'SkinsCollection',
      category: 'skins',
      type: 'main-contract',
      address: '0x7f3B1a30f86A5a06264AaB6B88708edEffF5B117',
      description: 'Organizes skins into thematic collections',
      size: 'large',
      functions: [
        'createCollection', 'updateCollection', 'addSkinToCollection',
        'removeSkinFromCollection', 'getCollectionSkins', 'getCollectionInfo'
      ],
      connections: ['oli-skins', 'skins-season', 'skins-category']
    },
    {
      id: 'skins-category',
      name: 'SkinsCategory',
      category: 'skins',
      type: 'main-contract',
      address: '0x34069Cd75433F36d8B7F31435De16a0D1F0dF7d4',
      description: 'Categorizes skins by type and rarity',
      size: 'medium',
      functions: [
        'createCategory', 'updateCategory', 'assignSkinCategory',
        'getCategorySkins', 'getCategoryInfo'
      ],
      connections: ['oli-skins', 'skins-collection']
    },
    {
      id: 'skins-tools',
      name: 'SkinsTools',
      category: 'skins',
      type: 'main-contract',
      address: '0xE6868c9656018C2d6FAda01bd65236374B0C1a51',
      description: 'Manages tool-based skins and their properties',
      size: 'xlarge',
      functions: [
        'createTool', 'updateTool', 'setToolProperties',
        'getToolInfo', 'assignToolLevel', 'upgradeToolLevel'
      ],
      connections: ['oli-skins', 'skins-season']
    },
    {
      id: 'skins-marketplace',
      name: 'SkinsMarketplace',
      category: 'skins',
      type: 'main-contract',
      address: '0x4aEf79abcC3ef4d68b748b8cCFE8EA137E9e0d1b',
      description: 'P2P marketplace for trading skins',
      size: 'xlarge',
      types: ['marketplace', 'trading'],
      functions: [
        'createListing', 'cancelListing', 'purchaseSkin',
        'createAuction', 'placeBid', 'claimAuction',
        'setMarketplaceFee', 'getActiveListings'
      ],
      connections: ['oli-skins', 'skins-purchase-rules']
    },
    {
      id: 'skins-purchase-rules',
      name: 'SkinsPurchaseRules',
      category: 'skins',
      type: 'main-contract',
      address: '0xa1bb2C953aA9e0625917892e34C224D751AA165e',
      description: 'Complex purchase validation and rules engine',
      size: 'xlarge',
      functions: [
        'setPurchaseRules', 'validatePurchase', 'checkEligibility',
        'applyDiscounts', 'processPayment', 'refundPayment'
      ],
      connections: ['oli-skins', 'skins-marketplace', 'skins-first-purchase']
    },
    {
      id: 'skins-first-purchase',
      name: 'SkinsFirstPurchase',
      category: 'skins',
      type: 'main-contract',
      address: '0xa07C62E10A73F7f59DF94fb98F6E5f86BD9e17C9',
      description: 'Tracks first ownership and minting records',
      size: 'medium',
      functions: [
        'recordFirstPurchase', 'isFirstOwner', 'getFirstOwner',
        'wasFirstOwnerOfAnyInstance', 'getOwnedInstances'
      ],
      connections: ['oli-skins', 'skins-purchase-rules']
    },
    {
      id: 'skins-rewards',
      name: 'SkinsRewards',
      category: 'skins',
      type: 'main-contract',
      address: '0x4A33E274647a70B57531C086c1261cC9ccF28C94',
      description: 'Reward distribution system for achievements',
      size: 'large',
      functions: [
        'distributeRewards', 'claimRewards', 'setRewardRules',
        'getUserRewards', 'calculateRewards'
      ],
      connections: ['oli-skins', 'skins-tasks', 'acces-xp']
    },
    {
      id: 'skins-tasks',
      name: 'SkinsTasks',
      category: 'skins',
      type: 'main-contract',
      address: '0xeB2977FE3B2412279FCBCcc1e721a48F86F5Fd96',
      description: 'Task management and completion tracking',
      size: 'large',
      functions: [
        'createTask', 'completeTask', 'verifyTaskCompletion',
        'getUserTasks', 'getTaskRewards'
      ],
      connections: ['skins-rewards', 'oli-skins']
    },
    {
      id: 'skins-gift',
      name: 'SkinsGift',
      category: 'skins',
      type: 'main-contract',
      address: '0xC9E1A11e432234AcC0BFe866B16ef21834f00fa5',
      description: 'Gift and transfer system for skins',
      size: 'medium',
      functions: [
        'giftSkin', 'acceptGift', 'rejectGift',
        'bulkGift', 'setGiftRules'
      ],
      connections: ['oli-skins']
    },
    {
      id: 'skins-features',
      name: 'SkinsFeatures',
      category: 'skins',
      type: 'main-contract',
      address: '0xcB07e2Dd9533c994B871083FDf24CEBE129C6AD2',
      description: 'Advanced features and utilities for skins',
      size: 'medium',
      functions: [
        'addFeature', 'removeFeature', 'updateFeature',
        'getSkinFeatures', 'hasFeature'
      ],
      connections: ['oli-skins']
    },
    {
      id: 'skins-equip',
      name: 'SkinsEquip',
      category: 'skins',
      type: 'main-contract',
      address: '0x59B4320BCB2ced113A3BA9466cF8d84E0Cc3B275',
      description: 'Equipment and loadout management system',
      size: 'large',
      functions: [
        'equipSkin', 'unequipSkin', 'createLoadout',
        'switchLoadout', 'getEquippedSkins'
      ],
      connections: ['oli-skins', 'skins-features']
    },
    {
      id: 'skins-boxes',
      name: 'SkinsBoxes',
      category: 'skins',
      type: 'main-contract',
      address: '0x3A849A99F342668Eb9625a237496742F7571288E',
      description: 'Loot box and mystery box system',
      size: 'large',
      functions: [
        'createBox', 'openBox', 'setBoxContents',
        'purchaseBox', 'getBoxInfo'
      ],
      connections: ['oli-skins', 'skins-purchase-rules']
    },
    {
      id: 'skins-creator',
      name: 'SkinsCreator',
      category: 'skins',
      type: 'main-contract',
      address: '0x56bF914a3F4D84A6ed277dac8d1D622EBe22C1Bb',
      description: 'Creator tools for custom skin generation',
      size: 'large',
      functions: [
        'createCustomSkin', 'uploadAssets', 'validateDesign',
        'submitForApproval', 'publishSkin'
      ],
      connections: ['oli-skins', 'skins-tools']
    },

    // Token Systems
    {
      id: 'wrapped-acces',
      name: 'WrappedAcces',
      category: 'tokens',
      type: 'main-contract',
      address: '0x6DeaF9D702329eeeC0e780A20ba99353D2E2D407',
      description: 'ERC20 wrapped version of native ACCES token',
      size: 'medium',
      standard: 'ERC20',
      functions: [
        'wrap', 'unwrap', 'transfer', 'approve',
        'transferFrom', 'balanceOf', 'totalSupply'
      ],
      connections: ['acces-coin-locker', 'user-asset-tracker']
    },
    {
      id: 'blacxes',
      name: 'Blacxes',
      category: 'tokens',
      type: 'main-contract',
      description: 'ERC1155 utility token with packaging system',
      size: 'large',
      standard: 'ERC1155',
      functions: [
        'mint', 'mintPackage', 'unpackPackage', 'createPackage',
        'transferPackage', 'getUserPackages', 'balanceOf'
      ],
      connections: ['blacxes-locker', 'user-asset-tracker']
    },
    {
      id: 'acces-xp',
      name: 'AccesXP',
      category: 'tokens',
      type: 'main-contract',
      address: '0x55E13ec0a3DEa08600089c0f2084B6946B9Ab61f',
      description: 'Experience points system with leveling mechanics',
      size: 'medium',
      functions: [
        'addXP', 'removeXP', 'getUserXP', 'getUserLevel',
        'calculateLevel', 'getXPForLevel'
      ],
      connections: ['acces-levels', 'skins-rewards', 'user-profile-manager']
    },
    {
      id: 'oli-nft',
      name: 'OLINFT',
      category: 'tokens',
      type: 'main-contract',
      address: '0xc0c7951dbe0Dba08026d8573D5704A888beEFFa0',
      description: 'Core character NFT system',
      size: 'medium',
      standard: 'ERC721',
      functions: [
        'mint', 'burn', 'getUserNFT', 'getGender',
        'setTokenURI', 'buildTokenURI'
      ],
      connections: ['oli-activator', 'user-creator-multisig']
    },
    {
      id: 'oli-activator',
      name: 'OLIActivator',
      category: 'tokens',
      type: 'main-contract',
      address: '0xDC1d34ef2359c7aA40751dc0A79D9E7043D9Ed53',
      description: 'Activation system for OLI character profiles',
      size: 'small',
      functions: ['activateOLI'],
      connections: ['oli-nft', 'user-creator-multisig']
    },

    // User Account System
    {
      id: 'user-creator-multisig',
      name: 'UserCreatorMultisig',
      category: 'user',
      type: 'main-contract',
      address: '0x6709AC2000f5c512938F1C8ad05E05D1a929aBE6',
      description: 'Multi-signature user account creation system',
      size: 'xlarge',
      functions: [
        'createUserAccount', 'linkUserID', 'registerUserName',
        'activateOLI', 'setProfile', 'deleteUser'
      ],
      connections: [
        'user-account-multisig', 'user-id', 'user-name-registerer',
        'oli-activator', 'acces-referral'
      ]
    },
    {
      id: 'user-account-multisig',
      name: 'UserAccountMultisig',
      category: 'user',
      type: 'main-contract',
      description: 'Gnosis Safe-based multi-signature user accounts',
      size: 'xlarge',
      functions: [
        'addWallet', 'removeWallet', 'changeMainWallet',
        'withdrawAcces', 'withdrawERC20', 'withdrawERC1155',
        'totalAcces', 'totalBlacxes'
      ],
      connections: [
        'user-profile-manager', 'user-wallet-manager',
        'user-asset-tracker', 'user-withdrawal-manager'
      ]
    },
    {
      id: 'user-profile-manager',
      name: 'UserProfileManager',
      category: 'user',
      type: 'main-contract',
      address: '0x5d7Eb8E777774046765cc1997f9e10a09CA3004c',
      description: 'Manages user profiles and metadata',
      size: 'large',
      functions: [
        'setProfile', 'updateProfile', 'getProfile',
        'setAvatar', 'setBio', 'setPreferences'
      ],
      connections: ['user-account-multisig', 'user-bio']
    },
    {
      id: 'user-wallet-manager',
      name: 'UserWalletManager',
      category: 'user',
      type: 'main-contract',
      address: '0x8B6819313793710F21C6ae23DBe52A3E8B67989f',
      description: 'Multi-wallet management for user accounts',
      size: 'medium',
      functions: [
        'addWallet', 'removeWallet', 'setMainWallet',
        'getWallets', 'validateWallet'
      ],
      connections: ['user-account-multisig']
    },
    {
      id: 'user-asset-tracker',
      name: 'UserAssetTracker',
      category: 'user',
      type: 'main-contract',
      address: '0xe3F52b2eEca85E100a7304Ce21fE03E1eAAee8Ef',
      description: 'Tracks all user assets across wallets',
      size: 'large',
      functions: [
        'trackAsset', 'updateAssetBalance', 'getTotalAssets',
        'getAssetHistory', 'calculateNetWorth'
      ],
      connections: ['user-account-multisig', 'wrapped-acces', 'blacxes']
    },
    {
      id: 'user-withdrawal-manager',
      name: 'UserWithdrawalManager',
      category: 'user',
      type: 'main-contract',
      address: '0xd9b92274a5C9058e9a4B4ec79D1997e834819713',
      description: 'Secure withdrawal processing system',
      size: 'large',
      functions: [
        'requestWithdrawal', 'processWithdrawal', 'validateWithdrawal',
        'cancelWithdrawal', 'getWithdrawalHistory'
      ],
      connections: ['user-account-multisig', 'acces-withdraw-validator']
    },
    {
      id: 'user-account-manager',
      name: 'UserAccountManager',
      category: 'user',
      type: 'main-contract',
      address: '0x6eFc356B6899baAEeb6c226F105F9046D99ffE97',
      description: 'High-level user account operations',
      size: 'large',
      functions: [
        'createAccount', 'upgradeAccount', 'deleteAccount',
        'getAccountInfo', 'setAccountSettings'
      ],
      connections: ['user-account-multisig']
    },
    {
      id: 'user-data-storage',
      name: 'UserDataStorage',
      category: 'user',
      type: 'main-contract',
      address: '0xd51Dbf149d26d23E78674c62Aa1036539A0CAc08',
      description: 'Secure storage for user data and preferences',
      size: 'medium',
      functions: [
        'storeUserData', 'getUserData', 'updateUserData',
        'deleteUserData', 'setDataPermissions'
      ],
      connections: ['user-creator-multisig']
    },
    {
      id: 'user-id',
      name: 'UserID',
      category: 'user',
      type: 'main-contract',
      address: '0x586F86d4DCCD80552b606B783A2F7Fa5C5a180F1',
      description: 'Unique user identification system',
      size: 'medium',
      functions: [
        'generateNewUserId', 'linkIdToContract', 'getUserIdByAddress',
        'getAddressByUserId', 'deleteUserId'
      ],
      connections: ['user-creator-multisig']
    },
    {
      id: 'user-name-registerer',
      name: 'UserNameRegisterer',
      category: 'user',
      type: 'main-contract',
      address: '0x4c9e7A9Ee3D836506aA368Beb4415602481258d1',
      description: 'Username registration and management',
      size: 'medium',
      functions: [
        'registerUserName', 'editUserName', 'deregisterUserName',
        'isUserNameExists', 'getUserNameOwner'
      ],
      connections: ['user-creator-multisig', 'user-name-storage']
    },
    {
      id: 'user-name-storage',
      name: 'UserNameStorage',
      category: 'user',
      type: 'main-contract',
      address: '0x7A7D75e143C96B2aC39562202dC6675A2Ffb4B7D',
      description: 'Storage system for username data',
      size: 'small',
      functions: [
        'storeName', 'getName', 'updateName', 'deleteName'
      ],
      connections: ['user-name-registerer']
    },
    {
      id: 'user-bio',
      name: 'UserBio',
      category: 'user',
      type: 'main-contract',
      address: '0x0d096A0d9C74F7FCC5e05b0E484008c83e97886E',
      description: 'User biography and extended profile data',
      size: 'medium',
      functions: [
        'setBio', 'getBio', 'updateBio', 'setBioPermissions'
      ],
      connections: ['user-profile-manager']
    },

    // Social Systems
    {
      id: 'acces-referral',
      name: 'AccesReferral',
      category: 'social',
      type: 'main-contract',
      address: '0x40F68167DEd69D23C2fF613Daee1C8d426bfB8eB',
      description: 'Multi-level referral system',
      size: 'medium',
      functions: [
        'addReferral', 'getReferralTree', 'getReferrer',
        'getReferees', 'getIndirectReferrals'
      ],
      connections: ['user-creator-multisig']
    },
    {
      id: 'follower-manager',
      name: 'FollowerManager',
      category: 'social',
      type: 'main-contract',
      address: '0xF90a15Fa55809Eb5f5A633ccce7CE1AE43EaC156',
      description: 'Social following and networking system',
      size: 'medium',
      functions: [
        'follow', 'unfollow', 'getFollowers',
        'getFollowing', 'isFollowing'
      ],
      connections: ['user-creator-multisig']
    },

    // Utility Systems
    {
      id: 'acces-coin-locker',
      name: 'AccesCoinLocker',
      category: 'utils',
      type: 'main-contract',
      address: '0x501bB307cca6035974b9cC89751703Cb9c90FfC2',
      description: 'Time-locked staking for ACCES tokens',
      size: 'large',
      functions: [
        'lockTokens', 'unlockTokens', 'extendLock',
        'getLockedAmount', 'getUnlockTime'
      ],
      connections: ['wrapped-acces']
    },
    {
      id: 'blacxes-locker',
      name: 'BlacxesLocker',
      category: 'utils',
      type: 'main-contract',
      address: '0xEE43A9447d8A54C50cEb67EB1E53C2bC15F2f6fa',
      description: 'Staking and locking system for Blacxes tokens',
      size: 'large',
      functions: [
        'lockBlacxes', 'unlockBlacxes', 'getStakingRewards',
        'claimRewards', 'getLockedBalance'
      ],
      connections: ['blacxes']
    },
    {
      id: 'acces-levels',
      name: 'AccesLevels',
      category: 'utils',
      type: 'main-contract',
      address: '0xDFc67C810e56bA846f533Db86a70F15120488DcC',
      description: 'User progression and leveling system',
      size: 'medium',
      functions: [
        'setUserLevel', 'getUserLevel', 'calculateLevelRequirements',
        'checkLevelUp', 'grantLevelRewards'
      ],
      connections: ['acces-xp']
    },
    {
      id: 'acces-migration',
      name: 'AccesMigration',
      category: 'utils',
      type: 'main-contract',
      address: '0x643Da7dd9b4213B446C11c3F2310974e378FeBD3',
      description: 'System for migrating from legacy contracts',
      size: 'medium',
      functions: [
        'migrateUser', 'migrateAssets', 'verifyMigration',
        'completeMigration', 'getMigrationStatus'
      ],
      connections: ['user-creator-multisig']
    }
  ],

  // Define relationships between contracts
  relationships: [
    // Interface implementations - Complete mapping
    // Standard ERC interfaces
    { source: 'oli-skins', target: 'ierc1155', type: 'implements' },
    { source: 'oli-nft', target: 'ierc721', type: 'implements' },
    { source: 'wrapped-acces', target: 'ierc20', type: 'implements' },
    { source: 'blacxes', target: 'ierc20', type: 'implements' },
    { source: 'acces-xp', target: 'ierc20', type: 'implements' },

    // Admin system interfaces
    { source: 'admin-manager', target: 'iadmin-manager', type: 'implements' },
    { source: 'acces-contracts-manager', target: 'iacces-contracts-manager', type: 'implements' },
    { source: 'acces-withdraw-validator', target: 'iacces-withdraw-validator', type: 'implements' },
    { source: 'registered-wallets', target: 'iregistered-wallets', type: 'implements' },
    { source: 'acces-data-manager', target: 'iacces-data-manager', type: 'implements' },

    // OLI Skins system interfaces
    { source: 'oli-skins', target: 'ioli-skins', type: 'implements' },
    { source: 'skins-tools', target: 'iskins-tools', type: 'implements' },
    { source: 'skins-marketplace', target: 'iskins-marketplace', type: 'implements' },
    { source: 'skins-purchase-rules', target: 'iskins-purchase-rules', type: 'implements' },
    { source: 'skins-first-purchase', target: 'iskins-first-purchase', type: 'implements' },
    { source: 'skins-rewards', target: 'iskins-rewards', type: 'implements' },
    { source: 'skins-gift', target: 'iskins-gift', type: 'implements' },
    { source: 'skins-features', target: 'iskins-features', type: 'implements' },
    { source: 'skins-equip', target: 'iskins-equip', type: 'implements' },
    { source: 'skins-boxes', target: 'iskins-boxes', type: 'implements' },
    { source: 'skins-season', target: 'iskins-season', type: 'implements' },
    { source: 'skins-collection', target: 'iskins-collection', type: 'implements' },
    { source: 'skins-category', target: 'iskins-category', type: 'implements' },
    { source: 'skins-tasks', target: 'iskins-tasks', type: 'implements' },
    { source: 'skins-creator', target: 'iskins-creator', type: 'implements' },

    // User account system interfaces
    { source: 'user-creator-multisig', target: 'iuser-creator-multisig', type: 'implements' },
    { source: 'user-account-multisig', target: 'iuser-account-multisig', type: 'implements' },
    { source: 'user-profile-manager', target: 'iuser-profile-manager', type: 'implements' },
    { source: 'user-wallet-manager', target: 'iuser-wallet-manager', type: 'implements' },
    { source: 'user-asset-tracker', target: 'iuser-asset-tracker', type: 'implements' },
    { source: 'user-withdrawal-manager', target: 'iuser-withdrawal-manager', type: 'implements' },
    { source: 'user-data-storage', target: 'iuser-data-storage', type: 'implements' },
    { source: 'user-id', target: 'iuser-id', type: 'implements' },
    { source: 'user-name-registerer', target: 'iuser-name-registerer', type: 'implements' },
    { source: 'user-name-storage', target: 'iuser-name-storage', type: 'implements' },
    { source: 'user-bio', target: 'iuser-bio', type: 'implements' },
    { source: 'user-account-manager', target: 'iuser-account-manager', type: 'implements' },

    // Token system interfaces
    { source: 'wrapped-acces', target: 'iwrapped-acces', type: 'implements' },
    { source: 'blacxes', target: 'iblacxes', type: 'implements' },
    { source: 'acces-xp', target: 'iacces-xp', type: 'implements' },
    { source: 'acces-xp-modal', target: 'iacces-xp-modal', type: 'implements' },
    { source: 'oli-nft', target: 'ioli-nft', type: 'implements' },
    { source: 'oli-activator', target: 'ioli-activator', type: 'implements' },

    // Social system interfaces
    { source: 'acces-referral', target: 'iacces-referral', type: 'implements' },
    { source: 'follower-manager', target: 'ifollower-manager', type: 'implements' },

    // Utility system interfaces
    { source: 'acces-coin-locker', target: 'iacces-coin-locker', type: 'implements' },
    { source: 'blacxes-locker', target: 'iblacxes-locker', type: 'implements' },
    { source: 'acces-levels', target: 'iacces-levels', type: 'implements' },
    { source: 'acces-migration', target: 'iacces-migration', type: 'implements' },

    // Blacklist system interface
    { source: 'acces-blacklisted-users', target: 'iacces-blacklisted-users', type: 'implements' },

    // External interfaces
    { source: 'user-creator-multisig', target: 'ignosis-safe', type: 'implements' },

    // Admin system relationships
    { source: 'admin-manager', target: 'acces-contracts-manager', type: 'manages' },
    { source: 'acces-contracts-manager', target: 'admin-manager', type: 'registers' },
    { source: 'admin-manager', target: 'acces-withdraw-validator', type: 'controls' },
    { source: 'admin-manager', target: 'registered-wallets', type: 'controls' },
    { source: 'admin-manager', target: 'acces-data-manager', type: 'controls' },
    
    // OLI Skins ecosystem - internal connections
    { source: 'oli-skins', target: 'skins-tools', type: 'uses' },
    { source: 'oli-skins', target: 'skins-marketplace', type: 'enables' },
    { source: 'oli-skins', target: 'skins-purchase-rules', type: 'validates' },
    { source: 'oli-skins', target: 'skins-first-purchase', type: 'tracks' },
    { source: 'oli-skins', target: 'skins-rewards', type: 'distributes' },
    { source: 'oli-skins', target: 'skins-gift', type: 'enables' },
    { source: 'oli-skins', target: 'skins-features', type: 'manages' },
    { source: 'oli-skins', target: 'skins-equip', type: 'equips' },
    { source: 'oli-skins', target: 'skins-boxes', type: 'opens' },
    { source: 'skins-marketplace', target: 'skins-purchase-rules', type: 'enforces' },
    { source: 'skins-season', target: 'skins-collection', type: 'organizes' },
    { source: 'skins-collection', target: 'skins-category', type: 'categorizes' },
    { source: 'skins-season', target: 'skins-tools', type: 'releases' },
    
    // User account system - internal connections
    { source: 'user-creator-multisig', target: 'user-account-multisig', type: 'creates' },
    { source: 'user-account-multisig', target: 'user-profile-manager', type: 'delegates' },
    { source: 'user-account-multisig', target: 'user-wallet-manager', type: 'delegates' },
    { source: 'user-account-multisig', target: 'user-asset-tracker', type: 'delegates' },
    { source: 'user-account-multisig', target: 'user-withdrawal-manager', type: 'delegates' },
    { source: 'user-profile-manager', target: 'user-data-storage', type: 'stores' },
    { source: 'user-profile-manager', target: 'user-id', type: 'manages' },
    { source: 'user-name-registerer', target: 'user-name-storage', type: 'stores' },
    { source: 'user-profile-manager', target: 'user-bio', type: 'manages' },
    { source: 'user-withdrawal-manager', target: 'acces-withdraw-validator', type: 'validates' },
    
    // Token system relationships
    { source: 'wrapped-acces', target: 'acces-coin-locker', type: 'locks' },
    { source: 'blacxes', target: 'blacxes-locker', type: 'locks' },
    { source: 'acces-xp', target: 'acces-levels', type: 'calculates' },
    
    // Cross-system integrations (different categories)
    { source: 'oli-nft', target: 'oli-activator', type: 'activates' },
    { source: 'user-creator-multisig', target: 'acces-referral', type: 'tracks' },
    { source: 'user-creator-multisig', target: 'follower-manager', type: 'manages' },
    { source: 'skins-rewards', target: 'acces-xp', type: 'grants' },
    { source: 'skins-rewards', target: 'wrapped-acces', type: 'rewards' },
    { source: 'skins-purchase-rules', target: 'wrapped-acces', type: 'accepts' },
    { source: 'skins-purchase-rules', target: 'blacxes', type: 'accepts' },
    { source: 'user-creator-multisig', target: 'acces-migration', type: 'migrates' },
    { source: 'admin-manager', target: 'oli-skins', type: 'administers' },
    { source: 'admin-manager', target: 'user-creator-multisig', type: 'administers' },
    { source: 'admin-manager', target: 'wrapped-acces', type: 'administers' },
    { source: 'admin-manager', target: 'blacxes', type: 'administers' },
    { source: 'acces-levels', target: 'skins-purchase-rules', type: 'unlocks' },
    { source: 'user-asset-tracker', target: 'oli-skins', type: 'tracks' },
    { source: 'user-asset-tracker', target: 'wrapped-acces', type: 'tracks' },
    { source: 'user-asset-tracker', target: 'blacxes', type: 'tracks' }
  ]
};

// Calculate category counts
contractsData.contracts.forEach(contract => {
  if (contractsData.categories[contract.category]) {
    contractsData.categories[contract.category].count++;
  }
});

// Add interfaces to contracts array for visualization
contractsData.interfaces.forEach(interface => {
  contractsData.contracts.push(interface);
  if (contractsData.categories[interface.category]) {
    contractsData.categories[interface.category].count++;
  }
});

// Calculate statistics
const stats = {
  totalContracts: contractsData.contracts.filter(c => c.type !== 'interface').length,
  totalInterfaces: contractsData.interfaces.length,
  totalFunctions: contractsData.contracts.reduce((sum, contract) => {
    return sum + (contract.functions ? contract.functions.length : 0);
  }, 0),
  totalConnections: contractsData.relationships.length
};

// Export for global access
window.contractsData = contractsData;
window.contractStats = stats; 