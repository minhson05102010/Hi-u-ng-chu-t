// Mouse Follower Background Script (Service Worker)
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // First time installation
        console.log('Mouse Follower Extension installed!');
        
        // Set default settings
        chrome.storage.sync.set({
            mouseFollowerSettings: {
                size: 50,
                opacity: 0.8,
                speed: 5,
                enabled: false
            }
        });
        
        // Show welcome notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Mouse Follower đã được cài đặt!',
            message: 'Nhấp vào biểu tượng tiện ích để bắt đầu sử dụng.'
        });
    }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This will open the popup automatically
    // No additional action needed since we have default_popup in manifest
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'saveSettings':
            // Save settings to chrome storage
            chrome.storage.sync.set({
                mouseFollowerSettings: request.settings
            }, () => {
                sendResponse({ success: true });
            });
            return true; // Keep message channel open for async response
            
        case 'getSettings':
            // Get settings from chrome storage
            chrome.storage.sync.get(['mouseFollowerSettings'], (result) => {
                sendResponse({
                    settings: result.mouseFollowerSettings || {
                        size: 50,
                        opacity: 0.8,
                        speed: 5,
                        enabled: false
                    }
                });
            });
            return true;
            
        case 'toggleExtension':
            // Toggle extension on/off for current tab
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: request.enabled ? 'enable' : 'disable'
                    });
                }
            });
            break;
    }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Inject content script if needed
        if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
            // Content script will be injected automatically via manifest
        }
    }
});

// Handle tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
    // Update extension state when switching tabs
    chrome.storage.sync.get(['mouseFollowerSettings'], (result) => {
        const settings = result.mouseFollowerSettings;
        if (settings && settings.enabled) {
            // Re-enable extension on new tab if it was enabled
            chrome.tabs.sendMessage(activeInfo.tabId, {
                action: 'checkState'
            }, (response) => {
                // Handle response if needed
                if (chrome.runtime.lastError) {
                    // Tab might not have content script loaded yet
                    console.log('Content script not ready yet');
                }
            });
        }
    });
});

// Handle window focus changes
chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // Browser lost focus - pause all followers
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'pause'
                    }, () => {
                        if (chrome.runtime.lastError) {
                            // Ignore errors for tabs without content script
                        }
                    });
                }
            });
        });
    } else {
        // Browser gained focus - resume followers
        chrome.tabs.query({windowId: windowId, active: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'resume'
                }, () => {
                    if (chrome.runtime.lastError) {
                        // Ignore errors
                    }
                });
            }
        });
    }
});

// Context menu (optional feature)
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'toggle-mouse-follower') {
        chrome.tabs.sendMessage(tab.id, {
            action: 'toggle'
        });
    }
});

// Create context menu
chrome.runtime.onStartup.addListener(() => {
    chrome.contextMenus.create({
        id: 'toggle-mouse-follower',
        title: 'Bật/Tắt Mouse Follower',
        contexts: ['page']
    });
});

// Handle extension unload
chrome.runtime.onSuspend.addListener(() => {
    // Clean up before extension is suspended
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {
                action: 'cleanup'
            }, () => {
                if (chrome.runtime.lastError) {
                    // Ignore errors
                }
            });
        });
    });
});
