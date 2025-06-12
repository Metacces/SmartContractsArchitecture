// Metacces Smart Contracts Visualization Engine
class ContractsVisualization {
  constructor() {
    this.svg = null;
    this.width = 0;
    this.height = 0;
    this.simulation = null;
    this.currentView = 'hierarchy';
    this.selectedCategory = 'all';
    this.zoomBehavior = null;
    this.transform = d3.zoomIdentity;
    
    // Color schemes for different categories
    this.colorScale = {
      admin: '#ff6b6b',
      skins: '#4ecdc4', 
      user: '#45b7d1',
      tokens: '#f9ca24',
      social: '#f0932b',
      utils: '#eb4d4b',
      interfaces: '#9b59b6'
    };
    
    // Node size mapping
    this.sizeScale = {
      small: 30,
      medium: 45,
      large: 60,
      xlarge: 75
    };
    
    this.init();
  }
  
  init() {
    this.setupSVG();
    this.setupZoom();
    this.loadData();
  }
  
  setupSVG() {
    const container = document.getElementById('mainVisualization');
    const rect = container.parentElement.getBoundingClientRect();
    
    this.width = rect.width;
    this.height = rect.height;
    
    this.svg = d3.select('#mainVisualization')
      .attr('width', this.width)
      .attr('height', this.height);
      
    // Clear existing content
    this.svg.selectAll('*').remove();
    
    // Create main group for zoom/pan
    this.mainGroup = this.svg.append('g')
      .attr('class', 'main-group');
      
    // Add gradient definitions
    this.addGradients();
    
    // Add arrow markers for directed graphs
    this.addArrowMarkers();
  }
  
  addGradients() {
    const defs = this.svg.append('defs');
    
    Object.entries(this.colorScale).forEach(([category, color]) => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${category}`)
        .attr('cx', '30%')
        .attr('cy', '30%');
        
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d3.color(color).brighter(0.5));
        
      gradient.append('stop')
        .attr('offset', '70%')
        .attr('stop-color', color);
        
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(color).darker(0.3));
    });

    // Add premium gradients
    const premiumRootGradient = defs.append('linearGradient')
      .attr('id', 'premium-gradient-root')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    
    premiumRootGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4ecdc4');
    premiumRootGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#44a08d');
    premiumRootGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3a9188');

    // Add premium category gradients
    Object.entries(this.colorScale).forEach(([category, color]) => {
      const premiumGradient = defs.append('linearGradient')
        .attr('id', `premium-gradient-${category}`)
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '100%');
        
      premiumGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d3.color(color).brighter(0.3));
        
      premiumGradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', color);
        
      premiumGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(color).darker(0.4));
    });

    // Add border gradients
    const borderGradient = defs.append('linearGradient')
      .attr('id', 'border-gradient-root')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    
    borderGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'rgba(78, 205, 196, 0.8)');
    borderGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'rgba(255, 255, 255, 0.4)');

    // Add premium filters
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Premium shadow filter
    const premiumShadow = defs.append('filter')
      .attr('id', 'premium-shadow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    
    premiumShadow.append('feDropShadow')
      .attr('dx', '0').attr('dy', '4')
      .attr('stdDeviation', '8')
      .attr('flood-color', 'rgba(78, 205, 196, 0.4)');

    // Subtle shadow filter
    const subtleShadow = defs.append('filter')
      .attr('id', 'subtle-shadow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%');
    
    subtleShadow.append('feDropShadow')
      .attr('dx', '0').attr('dy', '2')
      .attr('stdDeviation', '4')
      .attr('flood-color', 'rgba(0, 0, 0, 0.3)');
  }
  
  addArrowMarkers() {
    const defs = this.svg.select('defs');
    
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', '#4a5568')
      .attr('opacity', 0.7);
  }
  
  setupZoom() {
    this.zoomBehavior = d3.zoom()
      .scaleExtent([0.1, 3])
      .on('zoom', (event) => {
        this.transform = event.transform;
        this.mainGroup.attr('transform', event.transform);
      });
      
    this.svg.call(this.zoomBehavior);
  }
  
  loadData() {
    if (!window.contractsData) {
      console.error('Contract data not loaded');
      return;
    }
    
    this.data = window.contractsData;
    this.renderVisualization();
  }
  
  renderVisualization() {
    if (this.currentView === 'hierarchy') {
      this.renderHierarchy();
    } else {
      this.renderNetwork();
    }
  }
  
  renderHierarchy() {
    const filteredContracts = this.getFilteredContracts();
    const hierarchyData = this.createHierarchyData(filteredContracts);
    
    // Clear existing visualization
    this.mainGroup.selectAll('*').remove();
    
    // Create custom layout instead of tree layout
    this.renderCustomHierarchy(hierarchyData);
  }

  renderCustomHierarchy(data) {
    const categories = data.children;
    const categoryWidth = (this.width - 200) / categories.length;
    const startX = 100;
    const rootY = 100;
    const categoryY = 200;
    const contractStartY = 300;
    
    // Create nodes data with custom positioning
    const allNodes = [];
    
    // Root node
    const rootNode = {
      ...data,
      x: this.width / 2,
      y: rootY,
      depth: 0
    };
    allNodes.push(rootNode);
    
    // Category nodes and contract nodes
    categories.forEach((category, categoryIndex) => {
      const categoryX = startX + (categoryIndex * categoryWidth) + (categoryWidth / 2);
      
      // Category node
      const categoryNode = {
        ...category,
        x: categoryX,
        y: categoryY,
        depth: 1,
        parent: rootNode
      };
      allNodes.push(categoryNode);
      
      // Contract nodes in vertical column under each category
      category.children.forEach((contract, contractIndex) => {
        const contractNode = {
          ...contract,
          x: categoryX,
          y: contractStartY + (contractIndex * 65), // 65px spacing between contracts for better breathing room
          depth: 2,
          parent: categoryNode
        };
        allNodes.push(contractNode);
      });
    });
    
    // Create links data
    const allLinks = [];
    allNodes.forEach(node => {
      if (node.parent) {
        allLinks.push({
          source: node.parent,
          target: node
        });
      }
    });
    
    // Render links
    this.renderCustomHierarchyLinks(allLinks);
    
    // Render nodes
    this.renderCustomHierarchyNodes(allNodes);
    
    // Center the visualization
    this.centerVisualization();
  }
  
  renderNetwork() {
    const filteredContracts = this.getFilteredContracts();
    const networkData = this.createNetworkData(filteredContracts);
    
    // Clear existing visualization
    this.mainGroup.selectAll('*').remove();
    
    // Enhanced force simulation with much stronger anti-overlap forces
    this.simulation = d3.forceSimulation(networkData.nodes)
      .force('link', d3.forceLink(networkData.links)
        .id(d => d.id)
        .distance(d => this.getLinkDistance(d))
        .strength(0.1))
      .force('charge', d3.forceManyBody()
        .strength(d => {
          const baseStrength = d.type === 'interface' ? -800 : -1200;
          const sizeMultiplier = (this.sizeScale[d.size] || 45) * 8;
          return baseStrength - sizeMultiplier;
        })
        .distanceMax(400))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide()
        .radius(d => {
          // Button-based collision detection
          const width = d.type === 'interface' ? 90 : 100;
          const height = 26;
          return Math.max(width, height) / 2 + 15; // Add padding
        })
        .strength(1)
        .iterations(3))
      .force('categoryX', d3.forceX()
        .x(d => this.getCategoryPosition(d.category).x)
        .strength(0.05))
      .force('categoryY', d3.forceY()
        .y(d => this.getCategoryPosition(d.category).y)
        .strength(0.05))
      .alphaDecay(0.01)
      .velocityDecay(0.3);
    
    // Render links
    this.renderNetworkLinks(networkData.links);
    
    // Render nodes
    this.renderNetworkNodes(networkData.nodes);
    
    // Start simulation with longer runtime for better settling
    this.simulation
      .alpha(1)
      .alphaTarget(0)
      .restart()
      .on('tick', () => this.updateNetworkPositions());
  }
  
  createHierarchyData(contracts) {
    const categories = {};
    
    // Group contracts by category, excluding interfaces
    contracts.forEach(contract => {
      // Skip interfaces - we only want to show contracts
      if (contract.type === 'interface') return;
      
      if (!categories[contract.category]) {
        categories[contract.category] = {
          name: this.data.categories[contract.category]?.name || contract.category,
          category: contract.category,
          children: []
        };
      }
      categories[contract.category].children.push({
        ...contract,
        name: contract.name
      });
    });
    
    return {
      name: 'Metacces Ecosystem',
      children: Object.values(categories)
    };
  }
  
  createNetworkData(contracts) {
    const nodes = contracts.map(contract => {
      const categoryPos = this.getCategoryPosition(contract.category);
      return {
        ...contract,
        id: contract.id,
        // Initialize with spread-out positions around category centers
        x: categoryPos.x + (Math.random() - 0.5) * 200,
        y: categoryPos.y + (Math.random() - 0.5) * 200
      };
    });
    
    const links = this.data.relationships
      .filter(rel => {
        const sourceExists = contracts.find(c => c.id === rel.source);
        const targetExists = contracts.find(c => c.id === rel.target);
        return sourceExists && targetExists;
      })
      .map(rel => {
        const sourceNode = contracts.find(c => c.id === rel.source);
        const targetNode = contracts.find(c => c.id === rel.target);
        return {
          source: rel.source,
          target: rel.target,
          type: rel.type,
          crossCategory: sourceNode.category !== targetNode.category,
          sourceCategory: sourceNode.category,
          targetCategory: targetNode.category
        };
      });
    
    return { nodes, links };
  }
  
  renderCustomHierarchyLinks(links) {
    // Add premium connection lines with gradients
    const linkGroups = this.mainGroup.selectAll('.hierarchy-link-group')
      .data(links)
      .enter().append('g')
      .attr('class', 'hierarchy-link-group');

    // Add glow effect background
    linkGroups.append('line')
      .attr('class', 'hierarchy-link-glow')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', 'rgba(78, 205, 196, 0.3)')
      .attr('stroke-width', 6)
      .attr('opacity', 0.4)
      .attr('filter', 'url(#glow)');

    // Add main connection line
    linkGroups.append('line')
      .attr('class', 'hierarchy-link')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .attr('stroke', d => {
        if (d.source.depth === 0) return 'url(#link-gradient-root)';
        return `url(#link-gradient-${d.target.category})`;
      })
      .attr('stroke-width', d => d.source.depth === 0 ? 3 : 2)
      .attr('opacity', 0.8)
      .attr('stroke-linecap', 'round');

    // Add multiple animated particles along connections
    const self = this; // Capture the class instance
    linkGroups.each(function(d, i) {
      const line = d3.select(this);
      
      // Create 2-3 particles per connection for more dynamic effect
      const particleCount = d.source.depth === 0 ? 3 : 2;
      
      for (let p = 0; p < particleCount; p++) {
        const particle = line.append('circle')
          .attr('class', `connection-particle-${p}`)
          .attr('r', d.source.depth === 0 ? 2.5 : 2)
          .attr('fill', d.source.depth === 0 ? '#4ecdc4' : self.colorScale[d.target.category] || '#4ecdc4')
          .attr('opacity', 0.6 + (p * 0.1))
          .attr('filter', 'url(#glow)');

        // Create perpetual animation function for each particle
        const animateParticle = (particleIndex) => {
          const baseDelay = particleIndex * 800; // Stagger particles
          const animationDuration = 2500 + (i * 50) + (particleIndex * 200);
          
          particle
            .attr('cx', d.source.x)
            .attr('cy', d.source.y)
            .transition()
            .delay(baseDelay)
            .duration(animationDuration)
            .ease(d3.easeLinear)
            .attr('cx', d.target.x)
            .attr('cy', d.target.y)
            .on('end', () => {
              // Random delay before restarting to create organic flow
              const restartDelay = 300 + Math.random() * 800;
              setTimeout(() => {
                animateParticle(particleIndex);
              }, restartDelay);
            });
        };

        // Start the animation for this particle
        animateParticle(p);
      }
    });

    // Add link gradients
    const defs = this.svg.select('defs');
    
    // Root link gradient
    const rootLinkGradient = defs.append('linearGradient')
      .attr('id', 'link-gradient-root')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '100%').attr('y2', '100%');
    
    rootLinkGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4ecdc4');
    rootLinkGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'rgba(78, 205, 196, 0.6)');

    // Category link gradients
    Object.entries(this.colorScale).forEach(([category, color]) => {
      const linkGradient = defs.append('linearGradient')
        .attr('id', `link-gradient-${category}`)
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '100%').attr('y2', '100%');
        
      linkGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color);
      linkGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(color).copy({opacity: 0.6}));
    });
  }
  
  renderCustomHierarchyNodes(nodes) {
    const nodeGroups = this.mainGroup.selectAll('.hierarchy-node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'hierarchy-node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => this.handleNodeClick(d))
      .on('mouseover', (event, d) => this.handleNodeHover(d, true))
      .on('mouseout', (event, d) => this.handleNodeHover(d, false));

    // Add glassmorphism background for premium look
    nodeGroups.append('rect')
      .attr('class', 'node-bg')
      .attr('width', d => {
        if (d.depth === 0) return 164; // Root - wider with padding
        if (d.depth === 1) return 124; // Categories
        return 114; // Contracts - uniform sizes
      })
      .attr('height', d => {
        if (d.depth === 0) return 44; // Root - taller with padding
        if (d.depth === 1) return 36; // Categories
        return 32; // Contracts - uniform height
      })
      .attr('x', d => {
        if (d.depth === 0) return -82; // Center root
        if (d.depth === 1) return -62; // Center categories
        return -57; // Center contracts
      })
      .attr('y', d => {
        if (d.depth === 0) return -22; // Center root
        if (d.depth === 1) return -18; // Center categories
        return -16; // Center contracts
      })
      .attr('rx', 12) // More rounded corners
      .attr('ry', 12)
      .attr('fill', 'rgba(255, 255, 255, 0.05)')
      .attr('stroke', 'rgba(78, 205, 196, 0.2)')
      .attr('stroke-width', 1)
      .attr('filter', 'url(#glow)');
    
    // Add main button with premium gradients
    nodeGroups.append('rect')
      .attr('class', 'node-main')
      .attr('width', d => {
        if (d.depth === 0) return 160; // Root - wider
        if (d.depth === 1) return 120; // Categories
        return 110; // Contracts - uniform sizes
      })
      .attr('height', d => {
        if (d.depth === 0) return 40; // Root - taller
        if (d.depth === 1) return 32; // Categories
        return 28; // Contracts - uniform height
      })
      .attr('x', d => {
        if (d.depth === 0) return -80; // Center root
        if (d.depth === 1) return -60; // Center categories
        return -55; // Center contracts
      })
      .attr('y', d => {
        if (d.depth === 0) return -20; // Center root
        if (d.depth === 1) return -16; // Center categories
        return -14; // Center contracts
      })
      .attr('rx', 10) // Rounded corners
      .attr('ry', 10)
      .attr('fill', d => {
        if (d.depth === 0) return 'url(#premium-gradient-root)';
        if (d.depth === 1) return `url(#premium-gradient-${d.category})`;
        return `url(#premium-gradient-${d.category})`;
      })
      .attr('stroke', d => {
        if (d.depth === 0) return 'url(#border-gradient-root)';
        if (d.depth === 1) return 'rgba(255, 255, 255, 0.3)';
        return 'rgba(255, 255, 255, 0.2)';
      })
      .attr('stroke-width', d => d.depth === 0 ? 2 : 1)
      .attr('filter', d => d.depth === 0 ? 'url(#premium-shadow)' : 'url(#subtle-shadow)');

    // Add inner highlight for premium effect
    nodeGroups.append('rect')
      .attr('class', 'node-highlight')
      .attr('width', d => {
        if (d.depth === 0) return 156; // Slightly smaller
        if (d.depth === 1) return 116;
        return 106;
      })
      .attr('height', d => {
        if (d.depth === 0) return 2; // Thin highlight
        if (d.depth === 1) return 1.5;
        return 1;
      })
      .attr('x', d => {
        if (d.depth === 0) return -78;
        if (d.depth === 1) return -58;
        return -53;
      })
      .attr('y', d => {
        if (d.depth === 0) return -18;
        if (d.depth === 1) return -14.5;
        return -12.5;
      })
      .attr('rx', 1)
      .attr('fill', 'rgba(255, 255, 255, 0.4)')
      .attr('opacity', 0.8);

    // Add premium text with shadow
    nodeGroups.append('text')
      .attr('class', 'node-text-shadow')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(0, 0, 0, 0.3)')
      .attr('font-size', d => d.depth === 0 ? '14px' : d.depth === 1 ? '11px' : '9px')
      .attr('font-weight', d => d.depth < 2 ? '700' : '600')
      .text(d => this.truncateText(d.name, d.depth === 0 ? 20 : d.depth === 1 ? 15 : 12))
      .style('pointer-events', 'none')
      .attr('transform', 'translate(1, 1)'); // Shadow offset

    // Add main text
    nodeGroups.append('text')
      .attr('class', 'node-text')
      .attr('dy', 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', d => d.depth === 0 ? '14px' : d.depth === 1 ? '11px' : '9px')
      .attr('font-weight', d => d.depth < 2 ? '700' : '600')
      .text(d => this.truncateText(d.name, d.depth === 0 ? 20 : d.depth === 1 ? 15 : 12))
      .style('pointer-events', 'none')
      .style('text-shadow', '0 0 10px rgba(78, 205, 196, 0.5)');

    // Add subtle entrance animation
    nodeGroups
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 50)
      .style('opacity', 1)
      .attr('transform', d => `translate(${d.x},${d.y}) scale(1)`)
      .ease(d3.easeBackOut)
      .on('end', function(d, i) {
        // Add continuous subtle pulsing animation
        const node = d3.select(this);
        
        const pulse = () => {
          node.select('.node-main')
            .transition()
            .duration(2000 + Math.random() * 1000)
            .ease(d3.easeSinInOut)
            .attr('opacity', 0.8)
            .transition()
            .duration(2000 + Math.random() * 1000)
            .ease(d3.easeSinInOut)
            .attr('opacity', 1)
            .on('end', pulse);
        };
        
        // Start pulsing with random delay to avoid synchronization
        setTimeout(pulse, Math.random() * 3000);
      });
  }

  handleNodeHover(node, isHover) {
    const nodeGroup = this.mainGroup.selectAll('.hierarchy-node')
      .filter(d => d === node);
    
    if (isHover) {
      nodeGroup.transition()
        .duration(200)
        .attr('transform', d => `translate(${d.x},${d.y}) scale(1.05)`)
        .style('filter', 'brightness(1.1)');
      
      this.showTooltip(event, node);
    } else {
      nodeGroup.transition()
        .duration(200)
        .attr('transform', d => `translate(${d.x},${d.y}) scale(1)`)
        .style('filter', 'brightness(1)');
      
      this.hideTooltip();
    }
  }
  
  renderNetworkLinks(links) {
    this.networkLinks = this.mainGroup.selectAll('.network-link')
      .data(links)
      .enter().append('line')
      .attr('class', d => `network-link ${d.crossCategory ? 'cross-category' : 'same-category'}`)
      .attr('stroke', d => {
        if (d.crossCategory) {
          // Use gradient or special color for cross-category connections
          return d.type === 'implements' ? '#9b59b6' : '#4ecdc4';
        }
        return '#4a5568';
      })
      .attr('stroke-width', d => {
        if (d.crossCategory) return 3;
        if (d.type === 'implements') return 2.5;
        return 2;
      })
      .attr('opacity', d => {
        if (d.crossCategory) return 0.8;
        if (d.type === 'implements') return 0.7;
        return 0.6;
      })
      .attr('stroke-dasharray', d => {
        if (d.type === 'implements') return '8,4';
        if (d.crossCategory) return '12,6';
        return 'none';
      })
      .attr('marker-end', 'url(#arrowhead)');
  }
  
  renderNetworkNodes(nodes) {
    this.networkNodes = this.mainGroup.selectAll('.network-node')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'network-node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => this.handleNodeClick(d))
      .on('mouseover', (event, d) => this.showTooltip(event, d))
      .on('mouseout', () => this.hideTooltip())
      .call(d3.drag()
        .on('start', (event, d) => this.dragStart(event, d))
        .on('drag', (event, d) => this.dragMove(event, d))
        .on('end', (event, d) => this.dragEnd(event, d)));
    
    // Add button-style rectangles instead of circles
    this.networkNodes.append('rect')
      .attr('width', d => d.type === 'interface' ? 90 : 100)
      .attr('height', 26)
      .attr('x', d => d.type === 'interface' ? -45 : -50)
      .attr('y', -13)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', d => {
        if (d.type === 'interface') {
          return 'rgba(78, 205, 196, 0.2)';
        }
        return `url(#gradient-${d.category})`;
      })
      .attr('stroke', d => {
        if (d.type === 'interface') {
          return this.colorScale[d.category] || '#4ecdc4';
        }
        return '#ffffff';
      })
      .attr('stroke-width', d => d.type === 'interface' ? 1.5 : 1)
      .attr('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))');

    // Add node labels - centered in buttons
    this.networkNodes.append('text')
      .attr('dy', 3) // Center vertically in button
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.type === 'interface' ? '#4ecdc4' : '#ffffff')
      .attr('font-size', '9px')
      .attr('font-weight', '500')
      .text(d => this.truncateText(d.name, 12))
      .style('pointer-events', 'none');
  }
  
  updateNetworkPositions() {
    if (this.networkLinks) {
      this.networkLinks
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    }
    
    if (this.networkNodes) {
      this.networkNodes
        .attr('transform', d => `translate(${d.x},${d.y})`);
    }
  }
  
  getFilteredContracts() {
    if (this.selectedCategory === 'all') {
      return this.data.contracts;
    }
    return this.data.contracts.filter(c => c.category === this.selectedCategory);
  }
  
  getNodeSize(node) {
    if (!node || !node.size) return 45;
    return this.sizeScale[node.size] || 45;
  }
  
  getLinkDistance(link) {
    const sourceNode = this.data.contracts.find(c => c.id === link.source.id || c.id === link.source);
    const targetNode = this.data.contracts.find(c => c.id === link.target.id || c.id === link.target);
    
    const sourceSize = this.getNodeSize(sourceNode);
    const targetSize = this.getNodeSize(targetNode);
    
    // Much longer distances to prevent overlapping
    const baseDist = Math.max(sourceSize + targetSize + 120, 200);
    
    // Different distances based on connection type
    if (link.type === 'implements') return baseDist * 0.8; // Shorter for interface connections
    if (link.crossCategory) return baseDist * 2; // Much longer for cross-category
    return baseDist * 1.2; // Standard distance
  }

  getCategoryPosition(category) {
    const categories = ['admin', 'skins', 'user', 'tokens', 'social', 'utils'];
    const index = categories.indexOf(category);
    const total = categories.length;
    
    // Arrange categories in a larger circle with more spacing
    const angle = (index / total) * 2 * Math.PI;
    const radius = Math.min(this.width, this.height) * 0.35; // Larger radius
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    // Add some randomness to prevent perfect alignment
    const offsetX = (Math.random() - 0.5) * 50;
    const offsetY = (Math.random() - 0.5) * 50;
    
    return {
      x: centerX + Math.cos(angle) * radius + offsetX,
      y: centerY + Math.sin(angle) * radius + offsetY
    };
  }
  
  truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
  
  handleNodeClick(node) {
    if (!node || typeof node === 'string') return;
    
    this.showContractDetails(node);
    this.highlightConnections(node);
  }
  
  showContractDetails(contract) {
    const panel = document.getElementById('detailsPanel');
    const title = document.getElementById('detailsTitle');
    const content = document.getElementById('detailsContent');
    
    title.textContent = contract.name || 'Contract Details';
    
    const detailsHTML = `
      <div class="contract-details">
        <div class="detail-section">
          <h4>Contract Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">Category:</span>
              <span class="value">${this.data.categories[contract.category]?.name || contract.category}</span>
            </div>
            <div class="detail-item">
              <span class="label">Type:</span>
              <span class="value">${contract.type || 'Unknown'}</span>
            </div>
            ${contract.address ? `
              <div class="detail-item">
                <span class="label">Address:</span>
                <span class="value address">${contract.address}</span>
              </div>
            ` : ''}
            ${contract.standard ? `
              <div class="detail-item">
                <span class="label">Standard:</span>
                <span class="value">${contract.standard}</span>
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="detail-section">
          <h4>Description</h4>
          <p>${contract.description || 'No description available'}</p>
        </div>
        
        ${contract.functions && contract.functions.length > 0 ? `
          <div class="detail-section">
            <h4>Key Functions (${contract.functions.length})</h4>
            <div class="functions-list">
              ${contract.functions.map(func => `
                <div class="function-item">${func}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        ${contract.roles && contract.roles.length > 0 ? `
          <div class="detail-section">
            <h4>Admin Roles</h4>
            <div class="roles-list">
              ${contract.roles.map(role => `
                <div class="role-item">${role}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <div class="detail-section">
          <h4>Connected Contracts</h4>
          <div class="connections-list" id="connectionsList">
            Loading connections...
          </div>
        </div>
      </div>
    `;
    
    content.innerHTML = detailsHTML;
    panel.classList.add('open');
    
    // Load connections
    this.loadContractConnections(contract);
  }
  
  loadContractConnections(contract) {
    const connections = this.data.relationships.filter(rel => 
      rel.source === contract.id || rel.target === contract.id
    );
    
    const connectionsList = document.getElementById('connectionsList');
    
    if (connections.length === 0) {
      connectionsList.innerHTML = '<p>No direct connections found</p>';
      return;
    }
    
    const connectionsHTML = connections.map(conn => {
      const isSource = conn.source === contract.id;
      const otherContractId = isSource ? conn.target : conn.source;
      const otherContract = this.data.contracts.find(c => c.id === otherContractId);
      
      return `
        <div class="connection-item" data-contract-id="${otherContractId}">
          <div class="connection-info">
            <strong>${otherContract?.name || otherContractId}</strong>
            <span class="connection-type">${conn.type}</span>
            <span class="connection-direction">${isSource ? '→' : '←'}</span>
          </div>
        </div>
      `;
    }).join('');
    
    connectionsList.innerHTML = connectionsHTML;
    
    // Add click handlers for connections
    connectionsList.querySelectorAll('.connection-item').forEach(item => {
      item.addEventListener('click', () => {
        const contractId = item.dataset.contractId;
        const targetContract = this.data.contracts.find(c => c.id === contractId);
        if (targetContract) {
          this.showContractDetails(targetContract);
        }
      });
    });
  }
  
  highlightConnections(node) {
    // Reset all highlights
    this.mainGroup.selectAll('.network-link, .hierarchy-link')
      .attr('opacity', 0.6)
      .attr('stroke', '#4a5568')
      .attr('stroke-width', 2);
      
    this.mainGroup.selectAll('.network-node, .hierarchy-node')
      .select('rect')
      .attr('stroke-width', d => d.data?.type === 'interface' ? 1.5 : 1);
    
    if (this.currentView === 'network') {
      // Highlight connected links
      this.mainGroup.selectAll('.network-link')
        .filter(d => d.source.id === node.id || d.target.id === node.id)
        .attr('opacity', 1)
        .attr('stroke', '#4ecdc4')
        .attr('stroke-width', 3);
      
      // Highlight connected nodes
      const connectedNodeIds = new Set();
      this.data.relationships
        .filter(rel => rel.source === node.id || rel.target === node.id)
        .forEach(rel => {
          connectedNodeIds.add(rel.source === node.id ? rel.target : rel.source);
        });
      
      this.mainGroup.selectAll('.network-node')
        .select('rect')
        .attr('stroke-width', d => {
          if (d.id === node.id) return 3;
          if (connectedNodeIds.has(d.id)) return 2;
          return d.type === 'interface' ? 1.5 : 1;
        })
        .attr('stroke', d => {
          if (d.id === node.id) return '#4ecdc4';
          if (connectedNodeIds.has(d.id)) return '#44a08d';
          return d.type === 'interface' ? '#4ecdc4' : '#ffffff';
        });
    }
  }
  
  showTooltip(event, node) {
    if (!node || typeof node === 'string') return;
    
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', 'rgba(42, 47, 66, 0.95)')
      .style('color', '#ffffff')
      .style('padding', '12px')
      .style('border-radius', '8px')
      .style('font-size', '12px')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.4)')
      .style('-webkit-backdrop-filter', 'blur(10px)')
      .style('backdrop-filter', 'blur(10px)')
      .style('border', '1px solid #4a5568')
      .style('z-index', '1000');
    
    const content = `
      <strong>${node.name}</strong><br/>
      <span style="color: #b8c5d1;">${node.description || 'Smart Contract'}</span><br/>
      ${node.functions ? `<span style="color: #8892a6;">Functions: ${node.functions.length}</span>` : ''}
    `;
    
    tooltip.html(content)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
      .transition()
      .duration(200)
      .style('opacity', 1);
  }
  
  hideTooltip() {
    d3.selectAll('.tooltip').remove();
  }
  
  // Drag handlers for network view
  dragStart(event, d) {
    if (!event.active && this.simulation) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  dragMove(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  dragEnd(event, d) {
    if (!event.active && this.simulation) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  // Public methods for external control
  switchView(view) {
    this.currentView = view;
    this.renderVisualization();
  }
  
  filterByCategory(category) {
    this.selectedCategory = category;
    this.renderVisualization();
  }
  
  centerVisualization() {
    const bounds = this.mainGroup.node().getBBox();
    const fullWidth = this.width;
    const fullHeight = this.height;
    const width = bounds.width;
    const height = bounds.height;
    const midX = bounds.x + width / 2;
    const midY = bounds.y + height / 2;
    
    if (width === 0 || height === 0) return;
    
    const scale = 0.8 / Math.max(width / fullWidth, height / fullHeight);
    const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
    
    this.svg.transition()
      .duration(750)
      .call(this.zoomBehavior.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
  }
  
  zoomIn() {
    this.svg.transition()
      .duration(300)
      .call(this.zoomBehavior.scaleBy, 1.5);
  }
  
  zoomOut() {
    this.svg.transition()
      .duration(300)
      .call(this.zoomBehavior.scaleBy, 1 / 1.5);
  }
  
  resetView() {
    this.svg.transition()
      .duration(750)
      .call(this.zoomBehavior.transform, d3.zoomIdentity);
  }

  restartSimulation() {
    if (this.simulation && this.currentView === 'network') {
      // Re-randomize positions and restart with high energy
      this.simulation.nodes().forEach(node => {
        const categoryPos = this.getCategoryPosition(node.category);
        node.x = categoryPos.x + (Math.random() - 0.5) * 300;
        node.y = categoryPos.y + (Math.random() - 0.5) * 300;
        node.vx = 0;
        node.vy = 0;
      });
      
      this.simulation
        .alpha(1)
        .alphaTarget(0)
        .restart();
    }
  }
  
  search(query) {
    if (!query) {
      this.clearSearch();
      return;
    }
    
    const matchingContracts = this.data.contracts.filter(contract => 
      contract.name.toLowerCase().includes(query.toLowerCase()) ||
      (contract.description && contract.description.toLowerCase().includes(query.toLowerCase())) ||
      (contract.functions && contract.functions.some(func => func.toLowerCase().includes(query.toLowerCase())))
    );
    
    // Highlight matching nodes
    this.mainGroup.selectAll('.network-node, .hierarchy-node')
      .select('rect')
      .attr('stroke', d => {
        const isMatch = matchingContracts.some(match => match.id === (d.data?.id || d.id));
        if (isMatch) return '#4ecdc4';
        return d.data?.type === 'interface' || d.type === 'interface' ? '#4ecdc4' : '#ffffff';
      })
      .attr('stroke-width', d => {
        const isMatch = matchingContracts.some(match => match.id === (d.data?.id || d.id));
        if (isMatch) return 3;
        return d.data?.type === 'interface' || d.type === 'interface' ? 1.5 : 1;
      });
    
    return matchingContracts;
  }
  
  clearSearch() {
    this.mainGroup.selectAll('.network-node, .hierarchy-node')
      .select('rect')
      .attr('stroke', d => d.data?.type === 'interface' || d.type === 'interface' ? '#4ecdc4' : '#ffffff')
      .attr('stroke-width', d => d.data?.type === 'interface' || d.type === 'interface' ? 1.5 : 1);
  }
  
  resize() {
    const container = document.getElementById('mainVisualization');
    const rect = container.parentElement.getBoundingClientRect();
    
    this.width = rect.width;
    this.height = rect.height;
    
    this.svg
      .attr('width', this.width)
      .attr('height', this.height);
    
    if (this.simulation) {
      this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
      this.simulation.alpha(0.3).restart();
    }
  }
}

// Export for global access
window.ContractsVisualization = ContractsVisualization; 