// {Name: Web_Chat_Navigation}
// {Description: Demonstrates how to navigate in a web page with text and voice chat commands.}
// {EnableFeatures: TextChat}

// Navigating to page sections

// Page data, replace the URL and variants with your own ones
const PAGE_DATA = {
    "Home": {
        "url": "/",
        "variants": ["home", "main", "landing", "front", "starting"],
    },
    "Information": {
        "url": "/information",
        "variants": ["info", "information"],
    },
    "Products": {
        "url": "/products",
        "variants": ["products", "product"],
    },
    "Cart": {
        "url": "/cart",
        "variants": ["cart", "shoppingcart", "shoppingbasket"],
    },
    "Resume": {
        "url": "assets/pdf/alan-turing-jr-resume.pdf",
        "target": "_blank",
        "variants": ["resume", "CV", "curriculum vitae"],
    }
}

let arrPageAliases = [];
for (const [page, pageData] of Object.entries(PAGE_DATA)) {
    for (const variant of pageData.variants) {
        arrPageAliases.push(variant + '~' + page);
    }
}

project.websitePages = arrPageAliases.join('|');

// Generic navigation intent
intent(
    "(Open|Show|Display|View|Go to|Navigate to) $(p:websitePages) (page|screen|section|)",
    "$(p:websitePages) (page|screen|section)",
    p => {
        let page = p.websitePages.label;
        if (PAGE_DATA[page].target) {
            p.play({command: "openURL", url: PAGE_DATA[page].url, target: PAGE_DATA[page].target}, opts({force:true}));
        } else {
            p.play({command: "openURL", url: PAGE_DATA[page].url}, opts({force:true}));
        }
        p.play(
            `(Here you go|There it is|No problem). The ${page} page.`,
            `(Opening|Navigating to) the ${page} page`
        );
    }
);

// Individual navigation intents: replace the page names and urls with your own ones
intent(
    "(I want to|I need to|Will you|Would you|) (go|load|display|open|show|navigate|launch|visit|display the content of|unfold|bring up|present|pull up|spot|locate|get|head over|access|start|enter|view|open) (me|) (to|) (a|an|the|) homepage (please|for me|)",
    "(I want to|I need to|Will you|Would you|Please|) (go|get|bring|take) (me|) back (home|)",
    "(Home|Back|Start)",
    "Begin (a|the|this|) website",
    "Go back (home|)",
    p => {
        p.play({command: "openURL", url: "/"}, opts({force:true}));
        p.play("(Here you go|There it is|No problem)");
    }
);

intent(
    "(Please|Can you|Cound you|) tell me (something|anything|) about (the company|the store)",
    "Where (can I|do I|to) find (some|) information about (the company|the store)",
    p => {
        p.play({command: "openURL", url: "/informations"}, opts({force:true}));
        p.play("(Here is something about me|This is a bit of information about me|Here are some details about myself that I'd like to share)");
    }
);

intent(
    "What products do you (provide|offer|have)",
    "What do you have",
    p => {
        p.play({command: "openURL", url: "/products"}, opts({force:true}));
        p.play("We provide a variety of burgers, sides and drinks. Feel free to ask for more information.");

    }
);

intent(
    "Go to (cart|shoppingcart|shoppingbasket)",
    p => {
        p.play({command: "openURL", url: "/cart"}, opts({force:true}));
        p.play("(Here is a list of services I provide|Here's a breakdown of the services I specialize in|These are the services that I offer)");

    }
);


// Opening a resume
intent(
    "Do you have a resume",
    "Where can I find (the|your|) resume",
    p => {
        p.play({command: "openURL", url: "assets/pdf/alan-turing-jr-resume.pdf", target: "_blank"}, opts({force:true}));
        p.play("(Here you go|There it is)");
    }
)
