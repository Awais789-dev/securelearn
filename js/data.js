/* ==========================================================================
   data.js
   All site content lives here. To add a course, post, command or resource,
   add an object to the right list. No other file needs to change.
   Content is sample text for a demo project.
   ========================================================================== */

window.SL_DATA = {
  /* ---------------------------------------------------------------- Courses */
  courses: [
    {
      id: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      category: "Foundations",
      level: "Beginner",
      duration: "6 hours",
      icon: "🛡️",
      summary: "Start here. Learn the core ideas, common threats and how defenders think.",
      description:
        "This course gives you the vocabulary and mental models used in every security job. You will learn how attacks work at a high level and how simple controls stop most of them.",
      outcomes: [
        "Explain the CIA triad with real examples",
        "Tell the difference between a threat, a vulnerability and a risk",
        "Recognize common attacks such as phishing and malware",
        "Describe basic controls like MFA, patching and backups"
      ],
      requirements: ["No prior experience needed", "A computer with internet access"],
      modules: [
        {
          title: "Security basics",
          lessons: ["What is cybersecurity?", "The CIA triad", "Threats, vulnerabilities and risk", "Common attack types"]
        },
        {
          title: "Protecting systems",
          lessons: ["Authentication and passwords", "Encryption in plain words", "Patching and updates", "Backups and recovery"]
        },
        {
          title: "Security in practice",
          lessons: ["Security policies", "Incident response overview", "Career paths in security"]
        }
      ]
    },
    {
      id: "networking-for-security",
      title: "Networking for Security",
      category: "Networking",
      level: "Beginner",
      duration: "9 hours",
      icon: "🌐",
      summary: "Understand how data moves across networks so you can spot what is wrong.",
      description:
        "You cannot defend or test what you do not understand. This course covers the networking ideas that matter most for security work, from IP addresses to reading packets.",
      outcomes: [
        "Explain the OSI and TCP/IP models",
        "Work out subnets and IP ranges",
        "Describe how DNS, HTTP, DHCP and NAT work",
        "Read basic traffic in Wireshark"
      ],
      requirements: ["Basic computer skills", "Cybersecurity Fundamentals is helpful"],
      modules: [
        {
          title: "How networks work",
          lessons: ["OSI and TCP/IP models", "IP addressing and subnets", "MAC addresses and ARP", "Switches, routers and gateways"]
        },
        {
          title: "Core protocols",
          lessons: ["DNS in depth", "HTTP and HTTPS", "DHCP, NAT and ports", "TCP vs UDP"]
        },
        {
          title: "Network security",
          lessons: ["Firewalls and ACLs", "VPNs", "Reading packets in Wireshark", "Common network attacks"]
        }
      ]
    },
    {
      id: "linux-for-security",
      title: "Linux for Security Work",
      category: "Linux",
      level: "Beginner",
      duration: "8 hours",
      icon: "🐧",
      summary: "Get fast in the terminal. Most security tools run on Linux.",
      description:
        "Learn the commands, file permissions and scripting habits that security professionals use every day. Every lesson has small exercises you can run in a virtual machine.",
      outcomes: [
        "Move around the filesystem with confidence",
        "Manage users, groups and permissions",
        "Chain commands with pipes and redirection",
        "Read logs and harden SSH"
      ],
      requirements: ["A virtual machine with Ubuntu or Kali Linux", "Willingness to type commands"],
      modules: [
        {
          title: "Getting around",
          lessons: ["The Linux filesystem", "Essential commands", "Users and permissions", "Package management"]
        },
        {
          title: "Working faster",
          lessons: ["Pipes and redirection", "grep, awk and sed", "Bash scripting basics", "Cron jobs and services"]
        },
        {
          title: "Security focus",
          lessons: ["Log files and auditing", "SSH hardening", "Firewalls with ufw and iptables"]
        }
      ]
    },
    {
      id: "python-for-security",
      title: "Python for Security Automation",
      category: "Programming",
      level: "Intermediate",
      duration: "12 hours",
      icon: "🐍",
      summary: "Write small Python tools that scan, parse and automate boring security tasks.",
      description:
        "Start with Python basics, then build real utilities: a port scanner, a log parser and a file integrity checker. You finish with a small portfolio of scripts.",
      outcomes: [
        "Write clean Python scripts with functions and modules",
        "Use sockets to build a simple port scanner",
        "Parse logs with regular expressions",
        "Call web APIs with the requests library"
      ],
      requirements: ["Basic programming idea of variables and loops", "Python 3 installed"],
      modules: [
        {
          title: "Python quick start",
          lessons: ["Variables and data types", "Control flow and functions", "Files and error handling", "Working with modules"]
        },
        {
          title: "Network scripting",
          lessons: ["Sockets basics", "Build a port scanner", "Parsing logs with regex", "Calling web APIs with requests"]
        },
        {
          title: "Automation projects",
          lessons: ["File integrity checker", "Password strength auditor", "Simple log alert script"]
        }
      ]
    },
    {
      id: "ethical-hacking-essentials",
      title: "Ethical Hacking Essentials",
      category: "Pentesting",
      level: "Intermediate",
      duration: "14 hours",
      icon: "🕵️",
      summary: "Learn the pentest process from recon to reporting, inside a safe lab.",
      description:
        "Follow the same phases a professional tester uses: recon, scanning, enumeration, exploitation and reporting. Every exercise happens in an isolated lab that you build yourself.",
      outcomes: [
        "Explain rules of engagement and the legal side of testing",
        "Run recon and scans with Nmap",
        "Enumerate services and find known weaknesses",
        "Write a clear finding with evidence and a fix"
      ],
      requirements: ["Networking for Security", "Linux for Security Work", "A virtual lab"],
      modules: [
        {
          title: "Foundations",
          lessons: ["Rules of engagement and law", "The phases of a pentest", "Building a safe lab"]
        },
        {
          title: "Recon and scanning",
          lessons: ["Passive reconnaissance", "Active scanning with Nmap", "Service enumeration", "Vulnerability scanners"]
        },
        {
          title: "Exploitation basics",
          lessons: ["How exploits work", "Using Metasploit in a lab", "Password attacks", "Reporting your findings"]
        }
      ]
    },
    {
      id: "web-application-security",
      title: "Web Application Security",
      category: "Pentesting",
      level: "Intermediate",
      duration: "12 hours",
      icon: "🕸️",
      summary: "Find and fix the most common web flaws, from SQL injection to broken access control.",
      description:
        "Learn how web apps fail and how to protect them. You will practice on deliberately vulnerable apps and then learn the code level fixes.",
      outcomes: [
        "Use Burp Suite to inspect and change requests",
        "Spot SQL injection, XSS and CSRF",
        "Understand broken access control",
        "Apply fixes like parameterized queries and output encoding"
      ],
      requirements: ["Basic HTML and HTTP knowledge", "Networking for Security is helpful"],
      modules: [
        {
          title: "How web apps work",
          lessons: ["Requests, cookies and sessions", "OWASP Top 10 overview", "Setting up Burp Suite"]
        },
        {
          title: "Common flaws",
          lessons: ["SQL injection", "Cross-site scripting (XSS)", "CSRF", "Broken access control", "File upload risks"]
        },
        {
          title: "Defending apps",
          lessons: ["Input validation and output encoding", "Secure headers", "Authentication done right", "Writing a vulnerability report"]
        }
      ]
    },
    {
      id: "soc-analyst-starter",
      title: "SOC Analyst Starter",
      category: "Blue Team",
      level: "Intermediate",
      duration: "11 hours",
      icon: "📡",
      summary: "Learn how a security operations center triages alerts and responds to incidents.",
      description:
        "Step into the defender seat. You will read logs, work through alerts, analyze a phishing email and follow an incident response playbook.",
      outcomes: [
        "Describe SOC roles and the alert triage workflow",
        "Read Windows, Linux and network logs",
        "Use MITRE ATT&CK to describe attacker behavior",
        "Analyze a phishing email step by step"
      ],
      requirements: ["Cybersecurity Fundamentals", "Networking for Security"],
      modules: [
        {
          title: "Inside a SOC",
          lessons: ["SOC roles and tiers", "Alert triage workflow", "Ticketing and escalation"]
        },
        {
          title: "Tools and data",
          lessons: ["SIEM basics", "Reading Windows event logs", "Linux and network logs", "Threat intelligence feeds"]
        },
        {
          title: "Detect and respond",
          lessons: ["MITRE ATT&CK for analysts", "Phishing analysis", "Malware triage basics", "Incident response playbooks"]
        }
      ]
    },
    {
      id: "network-penetration-testing",
      title: "Network Penetration Testing",
      category: "Pentesting",
      level: "Advanced",
      duration: "16 hours",
      icon: "🧭",
      summary: "Plan and run a full internal network test in a lab, then write the report.",
      description:
        "Bring your skills together. You will scope a test, map a lab network, attack weak services, pivot between hosts and deliver a professional report.",
      outcomes: [
        "Scope an engagement and get proper authorization",
        "Enumerate SMB, SNMP and LDAP services",
        "Move between lab hosts using pivoting",
        "Write an executive summary and technical findings"
      ],
      requirements: ["Ethical Hacking Essentials", "Comfort with Linux and Nmap"],
      modules: [
        {
          title: "Planning",
          lessons: ["Scoping and authorization", "Mapping networks at scale", "Enumerating SMB, SNMP and LDAP"]
        },
        {
          title: "Attacking networks",
          lessons: ["ARP spoofing and MITM in a lab", "Password spraying and cracking", "Pivoting and tunneling", "Wireless basics with a WPA2 lab"]
        },
        {
          title: "Wrap up",
          lessons: ["Post-exploitation basics", "Cleaning up after a test", "Writing the executive summary"]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------ Posts */
  posts: [
    {
      slug: "how-to-start-cybersecurity",
      title: "How to Start in Cybersecurity With No Experience",
      category: "Career",
      date: "2026-09-28",
      readTime: 6,
      excerpt: "A simple five step plan for students who feel lost at the start.",
      content: [
        { type: "p", text: "Cybersecurity looks huge from the outside. There are hundreds of tools, dozens of job titles and endless advice. The good news is that you only need a clear order to follow." },
        { type: "h2", text: "Step 1: Learn the basics of IT" },
        { type: "p", text: "Know how a computer, an operating system and a network work. If you can explain what happens when you open a website, you are on the right track." },
        { type: "h2", text: "Step 2: Get comfortable with Linux and networking" },
        { type: "ul", items: ["Learn 30 core Linux commands", "Understand IP addresses, DNS and HTTP", "Know the difference between TCP and UDP", "Learn to read a packet capture in Wireshark"] },
        { type: "h2", text: "Step 3: Practice in a safe lab" },
        { type: "p", text: "Reading is not enough. Build a small lab with virtual machines and practice on systems made for learning." },
        { type: "note", text: "Only test systems you own or have written permission to test. Unauthorized testing is illegal in most countries." },
        { type: "h2", text: "Step 4: Pick a direction" },
        { type: "p", text: "Offensive roles, like penetration testing, focus on finding weaknesses. Defensive roles, like SOC analyst, focus on detecting and responding to attacks. You can try both before you choose." },
        { type: "h2", text: "Step 5: Show your work" },
        { type: "p", text: "Write short walkthroughs of the labs you finish. Put your scripts on GitHub. A small public portfolio often says more than a long list of buzzwords." }
      ]
    },
    {
      slug: "nmap-scanning-basics",
      title: "Nmap Scanning Basics: Your First Five Commands",
      category: "Pentesting",
      date: "2026-09-21",
      readTime: 7,
      excerpt: "Nmap is the first tool most testers learn. Here is how to use it well.",
      content: [
        { type: "p", text: "Nmap finds live hosts, open ports and the services running on them. It is simple to start and deep enough to use for years." },
        { type: "note", text: "Scan only networks you own or have permission to test. Use your own lab for practice." },
        { type: "h2", text: "1. Find live hosts" },
        { type: "code", text: "nmap -sn 192.168.56.0/24" },
        { type: "p", text: "The -sn flag skips port scanning and only checks which hosts respond." },
        { type: "h2", text: "2. Scan common ports" },
        { type: "code", text: "nmap 192.168.56.101" },
        { type: "p", text: "By default Nmap checks the 1000 most common TCP ports." },
        { type: "h2", text: "3. Detect service versions" },
        { type: "code", text: "nmap -sV 192.168.56.101" },
        { type: "p", text: "Version detection tells you the software name and version, which helps you look for known issues." },
        { type: "h2", text: "4. Scan every port" },
        { type: "code", text: "nmap -p- 192.168.56.101" },
        { type: "p", text: "Services sometimes hide on unusual ports. A full scan takes longer but misses less." },
        { type: "h2", text: "5. Save your results" },
        { type: "code", text: "nmap -sV -oN scan.txt 192.168.56.101" },
        { type: "p", text: "Always save output. Notes and evidence matter as much as the scan itself." }
      ]
    },
    {
      slug: "what-is-a-soc",
      title: "What Is a SOC and What Does an Analyst Do?",
      category: "Blue Team",
      date: "2026-09-14",
      readTime: 5,
      excerpt: "A look inside the team that watches for attacks around the clock.",
      content: [
        { type: "p", text: "A Security Operations Center, or SOC, is a team that monitors an organization for security problems. They watch alerts, investigate suspicious activity and respond when something is wrong." },
        { type: "h2", text: "A day in the life" },
        { type: "ul", items: ["Review new alerts in the SIEM", "Check if an alert is real or a false alarm", "Collect evidence such as logs and email headers", "Escalate real incidents to senior staff", "Write clear notes in the ticket"] },
        { type: "h2", text: "Tiers in a SOC" },
        { type: "p", text: "Many SOCs use tiers. Tier 1 analysts triage alerts. Tier 2 analysts investigate deeper. Tier 3 analysts hunt threats and improve detection rules." },
        { type: "h2", text: "Skills that help" },
        { type: "ul", items: ["Networking and log reading", "Understanding of common attacks", "Clear writing", "Calm thinking under pressure"] },
        { type: "p", text: "It is a great entry point into security because you see real attacks every day." }
      ]
    },
    {
      slug: "strong-passwords-guide",
      title: "A Simple Guide to Strong Passwords",
      category: "Awareness",
      date: "2026-09-07",
      readTime: 4,
      excerpt: "Length beats complexity. Here is what actually keeps accounts safe.",
      content: [
        { type: "p", text: "Most account breaches start with weak or reused passwords. A few habits fix most of the risk." },
        { type: "h2", text: "Make it long" },
        { type: "p", text: "A passphrase of four or more random words is easy to remember and hard to guess. Length matters more than adding a few symbols." },
        { type: "h2", text: "Never reuse passwords" },
        { type: "p", text: "When one site is breached, attackers try the same password on other sites. A unique password for each account stops that chain." },
        { type: "h2", text: "Use a password manager" },
        { type: "p", text: "A manager creates and stores strong passwords for you. You only remember one strong master passphrase." },
        { type: "h2", text: "Turn on multi-factor authentication" },
        { type: "p", text: "MFA adds a second check. Even if your password leaks, the attacker still cannot log in. An authenticator app or a security key is better than SMS." },
        { type: "note", text: "Try the password checker in our Tools section. It runs fully in your browser and sends nothing anywhere." }
      ]
    },
    {
      slug: "common-web-vulnerabilities",
      title: "Four Web Vulnerabilities Every Beginner Should Know",
      category: "Web Security",
      date: "2026-08-30",
      readTime: 8,
      excerpt: "SQL injection, XSS, CSRF and broken access control, explained simply.",
      content: [
        { type: "p", text: "Most web attacks use a small set of ideas. Learn these four well and the rest become easier." },
        { type: "h2", text: "SQL injection" },
        { type: "p", text: "This happens when user input is mixed into a database query. The fix is to use parameterized queries so input is always treated as data." },
        { type: "code", text: "cursor.execute(\"SELECT * FROM users WHERE email = %s\", (email,))" },
        { type: "h2", text: "Cross-site scripting (XSS)" },
        { type: "p", text: "XSS lets an attacker run script in another user's browser. Encode output for the place it is shown, and add a Content Security Policy as a second layer." },
        { type: "h2", text: "Cross-site request forgery (CSRF)" },
        { type: "p", text: "CSRF tricks a logged in user's browser into sending a request they did not intend. Anti-CSRF tokens and SameSite cookies are the common defenses." },
        { type: "h2", text: "Broken access control" },
        { type: "p", text: "This means a user can reach data or actions they should not. It ranked first in the OWASP Top 10 for 2021. Always check permissions on the server for every request." },
        { type: "note", text: "Practice these only on intentionally vulnerable apps such as DVWA or the PortSwigger Web Security Academy labs." }
      ]
    },
    {
      slug: "build-a-home-lab",
      title: "Build a Home Security Lab for Free",
      category: "Labs",
      date: "2026-08-23",
      readTime: 6,
      excerpt: "A safe place to attack and defend, all on your own computer.",
      content: [
        { type: "p", text: "A home lab lets you practice without breaking any rules. All you need is a computer with enough memory and a free virtualization tool." },
        { type: "h2", text: "What you need" },
        { type: "ul", items: ["A computer with at least 8 GB of RAM (16 GB is better)", "VirtualBox or VMware Workstation Player", "A Kali Linux virtual machine as your attacker", "A target machine such as Metasploitable 2 or DVWA"] },
        { type: "h2", text: "Keep it isolated" },
        { type: "p", text: "Put the lab on a host-only or internal network. This keeps vulnerable machines away from your real network and the internet." },
        { type: "h2", text: "Use snapshots" },
        { type: "p", text: "Take a snapshot before every experiment. If something breaks, roll back in seconds." },
        { type: "note", text: "Never expose a deliberately vulnerable machine to the internet." },
        { type: "h2", text: "What to practice first" },
        { type: "ul", items: ["Scan the target with Nmap", "Capture traffic in Wireshark", "Try a web exercise in DVWA", "Write down what you did and what you learned"] }
      ]
    }
  ],

  /* ------------------------------------------------------------ Cheat sheets */
  sheets: [
    {
      id: "nmap",
      title: "Nmap",
      icon: "🔍",
      items: [
        { cmd: "nmap -sn 192.168.1.0/24", desc: "Ping scan to find live hosts" },
        { cmd: "nmap -sS target", desc: "TCP SYN scan (needs root)" },
        { cmd: "nmap -sV target", desc: "Detect service versions" },
        { cmd: "nmap -O target", desc: "Guess the operating system" },
        { cmd: "nmap -p 1-1000 target", desc: "Scan a port range" },
        { cmd: "nmap -p- target", desc: "Scan all 65535 ports" },
        { cmd: "nmap -sU target", desc: "Scan UDP ports" },
        { cmd: "nmap -A target", desc: "Aggressive scan: OS, version, scripts, traceroute" },
        { cmd: "nmap --script vuln target", desc: "Run vulnerability scripts" },
        { cmd: "nmap -oN scan.txt target", desc: "Save normal output to a file" }
      ]
    },
    {
      id: "linux",
      title: "Linux",
      icon: "🐧",
      items: [
        { cmd: "ls -la", desc: "List all files with details" },
        { cmd: "pwd", desc: "Show the current directory" },
        { cmd: "cat file.txt", desc: "Print a file" },
        { cmd: "grep -R 'text' .", desc: "Search for text in all files below here" },
        { cmd: "find / -name '*.conf' 2>/dev/null", desc: "Find config files, hide errors" },
        { cmd: "chmod 600 file", desc: "Only the owner can read and write" },
        { cmd: "chown user:group file", desc: "Change file owner and group" },
        { cmd: "ps aux", desc: "List all running processes" },
        { cmd: "ss -tulpn", desc: "Show listening ports and their programs" },
        { cmd: "ip a", desc: "Show network interfaces and IPs" },
        { cmd: "tail -f /var/log/auth.log", desc: "Watch login attempts live" },
        { cmd: "sudo -l", desc: "List what the current user can run with sudo" }
      ]
    },
    {
      id: "networking",
      title: "Networking",
      icon: "🌐",
      items: [
        { cmd: "ping -c 4 8.8.8.8", desc: "Send four ping packets" },
        { cmd: "traceroute example.com", desc: "Show the path packets take" },
        { cmd: "dig example.com", desc: "Query DNS records" },
        { cmd: "dig +short MX example.com", desc: "Show only the mail records" },
        { cmd: "nslookup example.com", desc: "Simple DNS lookup" },
        { cmd: "curl -I https://example.com", desc: "Show only the HTTP response headers" },
        { cmd: "ip route", desc: "Show the routing table" },
        { cmd: "arp -a", desc: "Show the ARP cache" },
        { cmd: "tcpdump -i eth0 port 80", desc: "Capture HTTP traffic on eth0" },
        { cmd: "whois example.com", desc: "Look up domain registration info" }
      ]
    },
    {
      id: "wireshark",
      title: "Wireshark",
      icon: "🦈",
      items: [
        { cmd: "ip.addr == 10.0.0.5", desc: "Traffic to or from one IP" },
        { cmd: "ip.src == 10.0.0.5", desc: "Traffic from one IP" },
        { cmd: "tcp.port == 443", desc: "Traffic on TCP port 443" },
        { cmd: "http", desc: "Show only HTTP packets" },
        { cmd: "dns", desc: "Show only DNS packets" },
        { cmd: "tcp.flags.syn == 1 && tcp.flags.ack == 0", desc: "Find new connection attempts (SYN packets)" },
        { cmd: "http.request.method == \"POST\"", desc: "Show HTTP POST requests" },
        { cmd: "frame contains \"password\"", desc: "Find packets containing a word" }
      ]
    },
    {
      id: "crypto",
      title: "Hashing and Encoding",
      icon: "🔐",
      items: [
        { cmd: "echo -n 'text' | sha256sum", desc: "SHA-256 hash of a string" },
        { cmd: "sha256sum file.iso", desc: "SHA-256 hash of a file" },
        { cmd: "echo -n 'text' | base64", desc: "Base64 encode" },
        { cmd: "echo 'dGV4dA==' | base64 -d", desc: "Base64 decode" },
        { cmd: "openssl rand -hex 16", desc: "Make 16 random bytes in hex" },
        { cmd: "openssl s_client -connect example.com:443", desc: "Inspect a TLS connection" },
        { cmd: "gpg --gen-key", desc: "Create a new GPG key pair" }
      ]
    },
    {
      id: "web",
      title: "Web Testing",
      icon: "🕸️",
      items: [
        { cmd: "curl -X POST -d 'a=1&b=2' URL", desc: "Send a POST request with data" },
        { cmd: "curl -H 'Authorization: Bearer TOKEN' URL", desc: "Send a custom header" },
        { cmd: "curl -L URL", desc: "Follow redirects" },
        { cmd: "curl -o page.html URL", desc: "Save the response to a file" },
        { cmd: "gobuster dir -u http://TARGET -w wordlist.txt", desc: "Find hidden directories (lab use)" },
        { cmd: "nikto -h http://TARGET", desc: "Basic web server scan (lab use)" },
        { cmd: "sqlmap -u 'http://TARGET/page?id=1' --batch", desc: "Test for SQL injection (lab use only)" }
      ]
    }
  ],

  /* ------------------------------------------------------------------ Ports */
  ports: [
    { port: 20, proto: "TCP", service: "FTP data", note: "File transfer data channel" },
    { port: 21, proto: "TCP", service: "FTP", note: "File transfer control. Sends passwords in plain text" },
    { port: 22, proto: "TCP", service: "SSH", note: "Secure remote login and file transfer" },
    { port: 23, proto: "TCP", service: "Telnet", note: "Remote login with no encryption. Avoid it" },
    { port: 25, proto: "TCP", service: "SMTP", note: "Sending email between servers" },
    { port: 53, proto: "TCP/UDP", service: "DNS", note: "Turns names into IP addresses" },
    { port: 67, proto: "UDP", service: "DHCP server", note: "Hands out IP addresses" },
    { port: 68, proto: "UDP", service: "DHCP client", note: "Receives IP addresses" },
    { port: 69, proto: "UDP", service: "TFTP", note: "Simple file transfer with no login" },
    { port: 80, proto: "TCP", service: "HTTP", note: "Web traffic without encryption" },
    { port: 110, proto: "TCP", service: "POP3", note: "Download email" },
    { port: 123, proto: "UDP", service: "NTP", note: "Time sync" },
    { port: 135, proto: "TCP", service: "MS RPC", note: "Windows remote procedure calls" },
    { port: 139, proto: "TCP", service: "NetBIOS", note: "Older Windows file sharing" },
    { port: 143, proto: "TCP", service: "IMAP", note: "Read email on a server" },
    { port: 161, proto: "UDP", service: "SNMP", note: "Network device monitoring" },
    { port: 389, proto: "TCP", service: "LDAP", note: "Directory services" },
    { port: 443, proto: "TCP", service: "HTTPS", note: "Encrypted web traffic" },
    { port: 445, proto: "TCP", service: "SMB", note: "Windows file sharing" },
    { port: 587, proto: "TCP", service: "SMTP submission", note: "Sending email from a client" },
    { port: 993, proto: "TCP", service: "IMAPS", note: "IMAP over TLS" },
    { port: 995, proto: "TCP", service: "POP3S", note: "POP3 over TLS" },
    { port: 1433, proto: "TCP", service: "MS SQL", note: "Microsoft SQL Server" },
    { port: 3306, proto: "TCP", service: "MySQL", note: "MySQL and MariaDB databases" },
    { port: 3389, proto: "TCP", service: "RDP", note: "Windows remote desktop" },
    { port: 5432, proto: "TCP", service: "PostgreSQL", note: "PostgreSQL databases" },
    { port: 5900, proto: "TCP", service: "VNC", note: "Remote desktop sharing" },
    { port: 8080, proto: "TCP", service: "HTTP alternate", note: "Common for proxies and dev servers" }
  ],

  /* ------------------------------------------------------------------ Tools */
  tools: [
    { id: "password-checker", title: "Password Checker", icon: "🔎", desc: "See how strong a password is and how long it might take to crack." },
    { id: "password-generator", title: "Password Generator", icon: "🎲", desc: "Make strong random passwords with the secure browser random source." },
    { id: "hash-generator", title: "Hash Generator", icon: "#️⃣", desc: "Get SHA hashes of text or a file. Great for checking downloads." },
    { id: "base64", title: "Base64 Tool", icon: "🔤", desc: "Encode and decode Base64, with full UTF-8 support." },
    { id: "ciphers", title: "Cipher Tool", icon: "🗝️", desc: "Try the Caesar and Vigenere ciphers and see how they work." },
    { id: "port-lookup", title: "Port Lookup", icon: "🔌", desc: "Search common ports by number or service name." }
  ],

  /* ---------------------------------------------------------------- Roadmap */
  roadmap: {
    stages: [
      {
        id: "foundations",
        title: "Foundations",
        duration: "4 to 6 weeks",
        desc: "Understand how computers and the internet work before touching any security tools.",
        tasks: [
          { id: "f1", text: "Learn how operating systems and hardware work" },
          { id: "f2", text: "Understand IP addresses, DNS and HTTP" },
          { id: "f3", text: "Learn the CIA triad and basic security terms" },
          { id: "f4", text: "Finish the Cybersecurity Fundamentals course" }
        ]
      },
      {
        id: "linux-scripting",
        title: "Linux and scripting",
        duration: "4 to 6 weeks",
        desc: "Most tools run on Linux, and scripting saves hours of repeated work.",
        tasks: [
          { id: "l1", text: "Get comfortable in the Linux terminal" },
          { id: "l2", text: "Learn Bash basics and write three small scripts" },
          { id: "l3", text: "Learn Python basics" },
          { id: "l4", text: "Build a simple port scanner in Python" }
        ]
      },
      {
        id: "security-core",
        title: "Security core",
        duration: "6 to 8 weeks",
        desc: "Go deeper on networking and learn how common attacks and defenses work.",
        tasks: [
          { id: "s1", text: "Study TCP/IP and subnetting in depth" },
          { id: "s2", text: "Learn to read traffic in Wireshark" },
          { id: "s3", text: "Understand common attacks and how to defend against them" },
          { id: "s4", text: "Build a home lab with virtual machines" },
          { id: "s5", text: "Prepare for an entry level certification such as Security+" }
        ]
      },
      {
        id: "choose-path",
        title: "Choose your path",
        duration: "8 to 12 weeks",
        desc: "Try offensive and defensive work, then go deep on the one you enjoy most.",
        tasks: [
          { id: "p1", text: "Pentesting: finish beginner rooms on TryHackMe or Hack The Box" },
          { id: "p2", text: "Pentesting: learn Burp Suite and Metasploit in your lab" },
          { id: "p3", text: "SOC: learn a SIEM and practice log analysis" },
          { id: "p4", text: "SOC: practice alert triage and phishing analysis" }
        ]
      },
      {
        id: "portfolio",
        title: "Portfolio and career",
        duration: "Ongoing",
        desc: "Show what you can do and start applying early.",
        tasks: [
          { id: "c1", text: "Write walkthroughs for the labs you finish" },
          { id: "c2", text: "Publish your projects on GitHub" },
          { id: "c3", text: "Earn an entry level certification" },
          { id: "c4", text: "Apply for internships and junior roles" }
        ]
      }
    ],
    certs: [
      { name: "CompTIA Network+", level: "Entry", focus: "Networking fundamentals" },
      { name: "CompTIA Security+", level: "Entry", focus: "General security knowledge" },
      { name: "eJPT", level: "Entry", focus: "Hands on junior pentesting" },
      { name: "Blue Team Level 1 (BTL1)", level: "Entry", focus: "Practical SOC and incident response" },
      { name: "CompTIA CySA+", level: "Intermediate", focus: "Security analytics and monitoring" },
      { name: "PNPT", level: "Intermediate", focus: "Practical network pentesting" },
      { name: "OSCP", level: "Advanced", focus: "Hands on exploitation exam" }
    ]
  },

  /* -------------------------------------------------------------- Resources */
  resources: [
    { title: "TryHackMe", url: "https://tryhackme.com", type: "Practice labs", desc: "Guided rooms that teach security step by step. Great for beginners." },
    { title: "Hack The Box", url: "https://www.hackthebox.com", type: "Practice labs", desc: "Realistic machines and challenges for growing testers." },
    { title: "OverTheWire", url: "https://overthewire.org", type: "Practice labs", desc: "Free wargames that teach Linux and security habits." },
    { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security", type: "Practice labs", desc: "Free, high quality web security lessons with hands on labs." },
    { title: "CyberDefenders", url: "https://cyberdefenders.org", type: "Practice labs", desc: "Blue team challenges based on real incidents." },
    { title: "OWASP", url: "https://owasp.org", type: "Reference", desc: "Home of the OWASP Top 10 and many free security guides." },
    { title: "MITRE ATT&CK", url: "https://attack.mitre.org", type: "Reference", desc: "A knowledge base of attacker tactics and techniques." },
    { title: "Nmap Reference Guide", url: "https://nmap.org/book/man.html", type: "Reference", desc: "The official manual for Nmap." },
    { title: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", type: "Reference", desc: "A widely used framework for managing security risk." },
    { title: "CVE Program", url: "https://www.cve.org", type: "Reference", desc: "The list of publicly known vulnerabilities." },
    { title: "Professor Messer", url: "https://www.professormesser.com", type: "Learning", desc: "Free video courses for CompTIA exams." },
    { title: "Cisco Networking Academy", url: "https://www.netacad.com", type: "Learning", desc: "Structured networking and security courses." },
    { title: "Kali Linux Documentation", url: "https://www.kali.org/docs/", type: "Learning", desc: "Official guides for installing and using Kali Linux." },
    { title: "Wireshark Documentation", url: "https://www.wireshark.org/docs/", type: "Learning", desc: "User guide and tutorials for packet analysis." },
    { title: "Have I Been Pwned", url: "https://haveibeenpwned.com", type: "Awareness", desc: "Check if your email appeared in a known data breach." },
    { title: "Exploit-DB", url: "https://www.exploit-db.com", type: "Reference", desc: "An archive of public exploits and proof of concept code." }
  ]
};
