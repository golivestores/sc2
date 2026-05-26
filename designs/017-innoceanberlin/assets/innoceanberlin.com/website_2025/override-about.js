/**
 * About Section Override Script
 * This script modifies the about section content after the React app loads
 * 
 * INSTRUCTIONS:
 * 1. First, open the site and navigate to /about
 * 2. Use DevTools to inspect the about section and find the exact selectors
 * 3. Update the selectors below to match your site's structure
 * 4. Update the content in the overrideContent object
 * 5. Add this script to index.html before the closing </body> tag
 */

(function() {
  'use strict';
  
  // Wait for React app to load
  function waitForReactApp() {
    return new Promise((resolve) => {
      // Check if React root is loaded
      const checkInterval = setInterval(() => {
        const root = document.getElementById('root');
        if (root && root.children.length > 0) {
          clearInterval(checkInterval);
          // Give React a moment to render
          setTimeout(resolve, 1000);
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 10000);
    });
  }
  
  // Override content - EDIT THIS SECTION
  const overrideContent = {
    // Update this text with your new about section content
    mainText: "Healers? Shamans? Holistic brand health restorers? Nah, just a bunch of obsessed brains devoting the best years of their lives to making great work. Call it compassion.",
  };
  
  // Function to update about section
  function updateAboutSection() {
    // Target the exact div with the about text
    // Selector: main > div with classes containing text-about-mobile
    const mainElement = document.querySelector('main.w-full');
    
    if (!mainElement) {
      console.log('About override: main element not found');
      return;
    }
    
    // Find the div with the about text (first div child of main)
    const aboutTextDiv = mainElement.querySelector('div.pr-20, div[class*="text-about"]');
    
    if (aboutTextDiv) {
      // Update the text content
      aboutTextDiv.textContent = overrideContent.mainText;
      console.log('About section text updated successfully!');
    } else {
      // Fallback: search for the text and replace it
      const walker = document.createTreeWalker(
        mainElement,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let node;
      while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        // Check if this text node contains the about content
        if (text.includes("Healers? Shamans?") || 
            text.includes("Holistic brand health restorers") ||
            text.includes("obsessed brains")) {
          node.textContent = overrideContent.mainText;
          console.log('About section updated via text search!');
          break;
        }
      }
    }
    
    // Remove employees
    const employeesToRemove = [
      { name: 'Will Cega', title: 'Design Director' },
      { name: 'José Gomes', title: 'Creative Director' },
      { name: 'Pedro Lourenço', title: 'Creative Director' },
      { name: 'Julia Sachse', title: 'Sr.Designer' },
      { name: 'Keta Kavlashvili', title: 'Sr.Account Manager' },
      { name: 'Enrique Arturo de Alba Gonzalez', title: 'Sr.Project Manager' },
      { name: 'Bianca Heusch', title: 'Sr.Art Director' },
      { name: 'Ahmet Kilic', title: 'Sr.Art Director' },
      { name: 'Noha Fahmy', title: 'Sr.Copywriter' },
      { name: 'Niocolás Montanaro', title: 'Sr.Copywriter' },
      { name: 'Pam Boschma', title: 'Copywriter' },
      { name: 'Changkyu Ku', title: 'Art Director' },
      { name: 'Alexander Aleksidze', title: 'Motion Designer' },
      { name: 'Paula Santos Luengo', title: 'Jr.Art Director' },
      { name: 'Insun Hwang', title: 'International Coordination Manager' }
    ];
    
    employeesToRemove.forEach(employee => {
      removeEmployee(employee.name, employee.title);
    });
    
    // Add new employees
    addEmployees();
  }
  
  // Function to add new employees
  function addEmployees() {
    const mainElement = document.querySelector('main.w-full');
    if (!mainElement) return;
    
    // Find the grid container (second div inside main with grid classes)
    const gridContainer = mainElement.querySelector('div.grid.grid-cols-3, div.grid');
    if (!gridContainer) {
      console.log('About override: grid container not found');
      return;
    }
    
    // Employees to add
    const employeesToAdd = [
      {
        name: 'Vladimir Osokin',
        title: 'Designer',
        // Use full CDN URL for production hosting
        // For local testing, the script will try local paths as fallback
        image: 'https://cdn-arkx.sfo3.cdn.digitaloceanspaces.com/innocean/images/employees/Vlad.gif'
        // Alternative: Use just filename 'Vlad.gif' and script will try both local and CDN paths
      }
      // Add more employees here as needed
    ];
    
    employeesToAdd.forEach(employee => {
      // Create the employee card structure matching the existing format
      const card = document.createElement('div');
      card.className = 'flex flex-col gap-2 text-gray-700';
      
      // Create image element
      const img = document.createElement('img');
      img.alt = employee.name;
      img.className = 'w-full h-auto object-contain';
      
      // Determine image path
      let imageSrc = employee.image;
      
      // If it's a full URL (CDN), use it directly (for production)
      if (imageSrc.startsWith('http')) {
        img.src = imageSrc;
      } 
      // If it's just a filename, try local path first (for local testing)
      else if (!imageSrc.startsWith('/')) {
        imageSrc = '/website_2025/images/employees/' + imageSrc;
        img.src = imageSrc;
      } 
      // If it's already a path, use it
      else {
        img.src = imageSrc;
      }
      
      // Add error handling to try fallback paths (for local testing)
      let fallbackAttempt = 0;
      img.onerror = function() {
        fallbackAttempt++;
        const filename = employee.image.split('/').pop();
        
        if (fallbackAttempt === 1 && employee.image.startsWith('http')) {
          // If CDN failed, try local path (for local testing)
          console.log(`CDN image failed, trying local path: ${this.src}`);
          this.src = '/website_2025/images/employees/' + filename;
        } else if (fallbackAttempt === 1 && !employee.image.startsWith('http')) {
          // If local failed, try CDN (for production)
          console.log(`Local image failed, trying CDN: ${this.src}`);
          this.src = 'https://cdn-arkx.sfo3.cdn.digitaloceanspaces.com/innocean/images/employees/' + filename;
        } else {
          console.error(`Failed to load image for ${employee.name} after ${fallbackAttempt} attempts`);
        }
      };
      
      img.onload = function() {
        console.log(`✓ Image loaded successfully for ${employee.name}: ${this.src}`);
      };
      
      // Create text container
      const textContainer = document.createElement('div');
      textContainer.className = 'text-left mb-3 lg:mb-0';
      
      // Create name element
      const nameElement = document.createElement('div');
      nameElement.className = 'font-ciron-medium text-xs lg:text-sm text-light-gray';
      nameElement.textContent = employee.name;
      
      // Create title element
      const titleElement = document.createElement('div');
      titleElement.className = 'font-ciron-medium text-xs lg:text-sm text-dark-gray';
      titleElement.textContent = employee.title;
      
      // Assemble the card
      textContainer.appendChild(nameElement);
      textContainer.appendChild(titleElement);
      card.appendChild(img);
      card.appendChild(textContainer);
      
      // Add to grid
      gridContainer.appendChild(card);
      console.log(`Added employee: ${employee.name} - ${employee.title}`);
    });
  }
  
  // Function to remove a specific employee
  function removeEmployee(name, title) {
    const mainElement = document.querySelector('main.w-full');
    if (!mainElement) return;
    
    // Find all employee cards (divs containing images with alt text)
    const employeeCards = mainElement.querySelectorAll('div.flex.flex-col.gap-2');
    
    employeeCards.forEach(card => {
      // Check if this card contains the employee we want to remove
      const nameElement = card.querySelector('div.font-ciron-medium.text-light-gray');
      const titleElement = card.querySelector('div.font-ciron-medium.text-dark-gray');
      
      if (nameElement && titleElement) {
        const cardName = nameElement.textContent.trim();
        const cardTitle = titleElement.textContent.trim();
        
        // Check if this is the employee to remove
        if (cardName === name && cardTitle === title) {
          // Remove the entire card
          card.remove();
          console.log(`Removed employee: ${name} - ${title}`);
        }
      }
    });
    
    // Alternative method: search by image alt text (fallback)
    const images = mainElement.querySelectorAll(`img[alt*="${name}"]`);
    images.forEach(img => {
      // Find the parent employee card and remove it
      let card = img.closest('div.flex.flex-col');
      if (card) {
        card.remove();
        console.log(`Removed employee card via image alt: ${name}`);
      }
    });
  }
  
  // Run when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForReactApp().then(updateAboutSection);
    });
  } else {
    waitForReactApp().then(updateAboutSection);
  }
  
  // Also watch for route changes (React Router)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.includes('/about')) {
        setTimeout(updateAboutSection, 500);
      }
    }
  }).observe(document, { subtree: true, childList: true });
  
})();

