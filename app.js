// Metacces Smart Contracts Visualization App
class MetaccesApp {
  constructor() {
    this.visualization = null;
    this.currentView = 'hierarchy';
    this.selectedCategory = 'all';
    this.searchTimeout = null;
    
    this.init();
  }
  
  init() {
    this.initializeVisualization();
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.updateStats();
    this.hideLoadingOverlay();
  }
  
  initializeVisualization() {
    this.visualization = new ContractsVisualization();
  }
  
  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
      
      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
      
      // Close sidebar on window resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          sidebar.classList.remove('open');
        }
      });
    }
    
    // View controls
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchView(e.target.dataset.view);
      });
    });
    
    // Category filters
    document.querySelectorAll('.filter-item').forEach(item => {
      item.addEventListener('click', (e) => {
        this.filterByCategory(e.currentTarget.dataset.category);
      });
    });
    
    // Visualization controls
    document.getElementById('zoomIn').addEventListener('click', () => {
      this.visualization.zoomIn();
    });
    
    document.getElementById('zoomOut').addEventListener('click', () => {
      this.visualization.zoomOut();
    });
    
    document.getElementById('resetView').addEventListener('click', () => {
      this.visualization.resetView();
    });

    document.getElementById('restartLayout').addEventListener('click', () => {
      this.visualization.restartSimulation();
      this.showToast('Layout restarted - nodes repositioning...', 'success');
    });
    
    document.getElementById('fullscreen').addEventListener('click', () => {
      this.toggleFullscreen();
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });
    
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.target.value = '';
        this.handleSearch('');
      }
    });
    
    // Details panel
    document.getElementById('closeDetails').addEventListener('click', () => {
      this.closeDetailsPanel();
    });
    
    // Window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // Click outside details panel to close
    document.addEventListener('click', (e) => {
      const detailsPanel = document.getElementById('detailsPanel');
      if (detailsPanel.classList.contains('open') && 
          !detailsPanel.contains(e.target) && 
          !e.target.closest('.contract-node, .hierarchy-node, .network-node')) {
        this.closeDetailsPanel();
      }
    });
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger shortcuts when typing in search
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key) {
        case '1':
          this.switchView('hierarchy');
          break;
        case '2':
          this.switchView('network');
          break;
        case 'r':
        case 'R':
          this.visualization.resetView();
          break;
        case '+':
        case '=':
          e.preventDefault();
          this.visualization.zoomIn();
          break;
        case '-':
          e.preventDefault();
          this.visualization.zoomOut();
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
        case 'Escape':
          this.closeDetailsPanel();
          break;
        case '/':
          e.preventDefault();
          document.getElementById('searchInput').focus();
          break;
      }
    });
  }
  
  switchView(view) {
    if (this.currentView === view) return;
    
    this.currentView = view;
    
    // Update UI
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // Update titles
    const titles = {
      hierarchy: {
        title: 'Contract Hierarchy Overview',
        description: 'Tree view showing the organizational structure of smart contracts'
      },
      network: {
        title: 'Contract Network Graph',
        description: 'Interactive network showing contract relationships and dependencies'
      }
    };
    
    document.getElementById('currentViewTitle').textContent = titles[view].title;
    document.getElementById('currentViewDescription').textContent = titles[view].description;
    
    // Switch visualization
    this.visualization.switchView(view);
    
    this.showToast(`Switched to ${view} view`, 'success');
  }
  
  filterByCategory(category) {
    if (this.selectedCategory === category) return;
    
    this.selectedCategory = category;
    
    // Update UI
    document.querySelectorAll('.filter-item').forEach(item => {
      item.classList.toggle('active', item.dataset.category === category);
    });
    
    // Filter visualization
    this.visualization.filterByCategory(category);
    
    const categoryName = category === 'all' ? 'All Systems' : 
                        window.contractsData.categories[category]?.name || category;
    this.showToast(`Filtered to: ${categoryName}`, 'success');
  }
  
  handleSearch(query) {
    clearTimeout(this.searchTimeout);
    
    this.searchTimeout = setTimeout(() => {
      if (query.trim()) {
        const results = this.visualization.search(query.trim());
        this.showSearchResults(results, query);
      } else {
        this.visualization.clearSearch();
        this.hideSearchResults();
      }
    }, 300);
  }
  
  showSearchResults(results, query) {
    if (results.length === 0) {
      this.showToast(`No results found for "${query}"`, 'warning');
      return;
    }
    
    this.showToast(`Found ${results.length} contract(s) matching "${query}"`, 'success');
  }
  
  hideSearchResults() {
    // Clear any search highlighting
    this.visualization.clearSearch();
  }
  
  closeDetailsPanel() {
    const detailsPanel = document.getElementById('detailsPanel');
    detailsPanel.classList.remove('open');
    
    // Clear any highlights
    this.visualization.highlightConnections({});
  }
  
  toggleFullscreen() {
    const container = document.querySelector('.visualization-container');
    
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => {
        this.showToast('Entered fullscreen mode', 'success');
        setTimeout(() => this.handleResize(), 100);
      }).catch(() => {
        this.showToast('Could not enter fullscreen mode', 'error');
      });
    } else {
      document.exitFullscreen().then(() => {
        this.showToast('Exited fullscreen mode', 'success');
        setTimeout(() => this.handleResize(), 100);
      });
    }
  }
  
  handleResize() {
    if (this.visualization) {
      this.visualization.resize();
    }
  }
  
  updateStats() {
    if (!window.contractsData || !window.contractStats) return;
    
    const data = window.contractsData;
    const stats = window.contractStats;
    
    // Calculate contracts only (excluding interfaces) for hierarchy view
    const contractsOnly = data.contracts.filter(c => c.type !== 'interface');
    const interfacesOnly = data.contracts.filter(c => c.type === 'interface');
    
    // Update DOM with calculated statistics
    document.getElementById('totalContracts').textContent = contractsOnly.length;
    document.getElementById('totalFunctions').textContent = stats.totalFunctions.toLocaleString();
    document.getElementById('totalInterfaces').textContent = interfacesOnly.length;
    document.getElementById('totalConnections').textContent = stats.totalConnections;
    
    // Update category counts (contracts only)
    Object.entries(data.categories).forEach(([key, category]) => {
      const countElement = document.getElementById(`count-${key}`);
      if (countElement) {
        const categoryContracts = contractsOnly.filter(c => c.category === key).length;
        const categoryInterfaces = interfacesOnly.filter(c => c.category === key).length;
        countElement.textContent = categoryContracts + categoryInterfaces; // Total including interfaces
      }
    });
    
    // Update total count for 'all' filter
    const allCountElement = document.getElementById('count-all');
    if (allCountElement) {
      allCountElement.textContent = data.contracts.length; // All contracts + interfaces
    }
  }
  
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
  
  hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 500);
    }
  }
  
  // Analytics and insights
  generateInsights() {
    if (!window.contractsData) return;
    
    const data = window.contractsData;
    const insights = [];
    
    // Most connected contract
    const connectionCounts = {};
    data.relationships.forEach(rel => {
      connectionCounts[rel.source] = (connectionCounts[rel.source] || 0) + 1;
      connectionCounts[rel.target] = (connectionCounts[rel.target] || 0) + 1;
    });
    
    const mostConnected = Object.entries(connectionCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (mostConnected) {
      const contract = data.contracts.find(c => c.id === mostConnected[0]);
      insights.push({
        type: 'hub',
        title: 'Most Connected Contract',
        description: `${contract?.name || mostConnected[0]} has ${mostConnected[1]} connections`,
        contractId: mostConnected[0]
      });
    }
    
    // Largest system
    const categoryContractCounts = {};
    data.contracts.forEach(contract => {
      categoryContractCounts[contract.category] = (categoryContractCounts[contract.category] || 0) + 1;
    });
    
    const largestCategory = Object.entries(categoryContractCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (largestCategory) {
      insights.push({
        type: 'system',
        title: 'Largest Subsystem',
        description: `${data.categories[largestCategory[0]]?.name} contains ${largestCategory[1]} contracts`,
        category: largestCategory[0]
      });
    }
    
    return insights;
  }
  
  // Export functionality
  exportVisualization(format = 'svg') {
    const svg = document.getElementById('mainVisualization');
    const svgData = new XMLSerializer().serializeToString(svg);
    
    if (format === 'svg') {
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      this.downloadFile(blob, 'metacces-contracts-visualization.svg');
    } else if (format === 'png') {
      this.svgToPng(svgData, 'metacces-contracts-visualization.png');
    }
  }
  
  svgToPng(svgData, filename) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = '#0f1419'; // Background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(blob => {
        this.downloadFile(blob, filename);
      });
    };
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  }
  
  downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Add slide out animation for toasts
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .detail-section {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #3a4553;
  }
  
  .detail-section:last-child {
    border-bottom: none;
  }
  
  .detail-section h4 {
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .detail-grid {
    display: grid;
    gap: 8px;
  }
  
  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  
  .detail-item .label {
    color: #8892a6;
    font-size: 12px;
    font-weight: 500;
  }
  
  .detail-item .value {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    text-align: right;
    max-width: 200px;
    word-wrap: break-word;
  }
  
  .detail-item .value.address {
    font-family: 'Courier New', monospace;
    font-size: 10px;
  }
  
  .functions-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 6px;
  }
  
  .function-item {
    background: #252a3a;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-family: 'Courier New', monospace;
    color: #4ecdc4;
    border: 1px solid #3a4553;
  }
  
  .roles-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .role-item {
    background: #2a2f42;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-family: 'Courier New', monospace;
    color: #f9ca24;
    border-left: 3px solid #667eea;
  }
  
  .connections-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .connection-item {
    background: #252a3a;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid #3a4553;
  }
  
  .connection-item:hover {
    background: #2a2f42;
    border-color: #667eea;
    transform: translateY(-1px);
  }
  
  .connection-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .connection-info strong {
    color: #ffffff;
    font-size: 13px;
    flex: 1;
  }
  
  .connection-type {
    background: #667eea;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 500;
  }
  
  .connection-direction {
    color: #8892a6;
    font-weight: bold;
  }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MetaccesApp();
  
  // Add some helpful console messages
  console.log('🚀 Metacces Smart Contracts Visualization loaded!');
  console.log('💡 Keyboard shortcuts:');
  console.log('  1/2 - Switch between hierarchy/network views');
  console.log('  +/- - Zoom in/out');
  console.log('  R - Reset view');
  console.log('  F - Toggle fullscreen');
  console.log('  / - Focus search');
  console.log('  ESC - Close panels');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause any running animations when tab is hidden
    if (window.app?.visualization?.simulation) {
      window.app.visualization.simulation.stop();
    }
  } else {
    // Resume when tab becomes visible
    if (window.app?.visualization?.simulation) {
      window.app.visualization.simulation.restart();
    }
  }
});

// Export the app class for external access
window.MetaccesApp = MetaccesApp; 