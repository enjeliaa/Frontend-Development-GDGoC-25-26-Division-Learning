/**
 * Render team members to the page
 */
function renderMembers() {
    const teamGrid = document.getElementById('teamGrid');
    
    if (members.length === 0) {
        teamGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500">No members yet. Be the first to join!</p>
            </div>
        `;
        return;
    }

    teamGrid.innerHTML = members.map((member, index) => {
        return createMemberCard(member, index);
    }).join('');
}

/**
 * Create HTML for a member card
 */
function createMemberCard(member, index) {
    const colors = ['google-blue', 'google-red', 'google-yellow', 'google-green'];
    const cardColor = colors[index % colors.length];
    
    const roleClass = member.role === 'Core Team' 
        ? 'bg-red-100 text-red-800 border border-red-300' 
        : 'bg-blue-50 text-blue-800';

    return `
        <div class="member-card bg-white rounded-lg shadow-md p-6 border-t-4 border-${cardColor}">
            <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    ${getInitials(member.name)}
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-bold text-gray-800">${member.name}</h3>
                    <span class="text-xs px-2 py-1 rounded ${roleClass} font-medium inline-block mt-1">
                        ${member.role}
                    </span>
                </div>
            </div>
            
            <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span>${member.major}</span>
                </div>
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Batch ${member.batch}</span>
                </div>
            </div>

            ${createSocialLinks(member)}
        </div>
    `;
}

/**
 * Get initials from name
 */
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

/**
 * Create social media links
 */
function createSocialLinks(member) {
    const links = [];
    
    if (member.github) {
        links.push(`
            <a href="https://github.com/${member.github}" target="_blank" 
               class="text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
        `);
    }
    
    if (member.linkedin) {
        links.push(`
            <a href="https://linkedin.com/in/${member.linkedin}" target="_blank" 
               class="text-gray-600 hover:text-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            </a>
        `);
    }

    if (links.length === 0) return '';

    return `
        <div class="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            ${links.join('')}
        </div>
    `;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderMembers);