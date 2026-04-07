// ============================================================
// BREACH REPORT — Complete Portfolio Data
// ============================================================

export const profile = {
  name: "Muni Nitish Kumar Yaddala",
  alias: "Nitish",
  email: "nitish.yaddala@gmail.com",
  linkedin: "linkedin.com/in/nitish-yaddala",
  location: "Seattle, WA",
  title: "Security Engineer",
  subtitle: "Application & Cloud Security · AI/LLM Security",
  caseNumber: "SAR-2026-0404",
  clearance: "OSCP",
};

export const stats = [
  { label: "FINDINGS", value: "200+" },
  { label: "TARGETS", value: "177" },
  { label: "PLATFORMS", value: "3" },
  { label: "SEVERITY", value: "CRITICAL-LOW" },
  { label: "CLEARANCE", value: "OSCP" },
];

export const executiveSummary = `4+ years of applied security experience — 3 years professional assessments (HighRadius, HP Inc., Bureau Veritas) plus 17 months MS Cybersecurity at Georgia Tech. Delivered 200+ validated findings across 177 targets spanning web applications, APIs, AWS cloud infrastructure, mobile platforms, AI/LLM systems, and blockchain protocols. Operated across the full assessment lifecycle: scoping, reconnaissance, exploitation, and engineering-ready remediation reporting. Specialized in uncovering complex multi-step chains that automated scanners miss.`;

export const focusAreas = [
  "AppSec",
  "Cloud",
  "AI/LLM",
  "Mobile",
  "Code Review",
  "Threat Modeling",
];

export const bureauVeritas = {
  company: "Bureau Veritas",
  subtitle: "Amazon AWS Security Assessments",
  period: "Mar 2024 – Present",
  role: "Security Engineer",
  location: "Seattle, WA",
  tabs: {
    WEB_API: [
      "Uncovered AuthN/AuthZ bypasses and privilege escalation paths by abusing IAM trust relationships, undocumented API parameters, and role assumption chains",
      "Validated real exploitability of SQLi, XXE, command injection, SSTI, and CRLF across all user-controlled surfaces — beyond scanner output",
      "Exposed CORS misconfigurations enabling credential-bearing cross-origin requests by testing wildcard origins and null origin reflection",
      "Revealed full GraphQL schemas and unauthorized resolver access through introspection abuse, batching, and missing depth limits",
      "Discovered systemic business logic chains by manipulating request ordering, state transitions, and cross-API interactions",
      "Identified mass assignment and parameter pollution by injecting unexpected fields and observing server-side model behavior",
      "Assessed cryptographic implementations for weak algorithms, insecure randomness, and improper certificate handling",
      "Detected second-order vulnerabilities by tracing stored payloads that executed in different contexts",
      "Identified subdomain takeover risks through dangling DNS records pointing to deprovisioned resources",
      "Tested authentication for brute force gaps, MFA bypass, session fixation, and token entropy weaknesses",
    ],
    AWS_CLOUD: [
      "Closed all 14 IAM Mandatory Test Cases against real service code — PassRole, resource policy, confused deputy, ABAC, S3 sniping, cross-account trust",
      "Detected S3 bucket sniping risks by simulating delete-and-recreate across account boundaries and analyzing predictable naming",
      "Automated attack surface mapping by building AWSPorter — Python framework reducing reconnaissance time on every engagement",
      "Validated cloud posture across entire AWS environments using ScoutSuite and Meteo",
      "Tested source IP enforcement in IAM conditions — confirmed X-Forwarded-For injection didn't bypass restrictions",
      "Validated HTTP request smuggling via Content-Length / Transfer-Encoding differential and protocol switching",
      "Confirmed AWS Organizations integration — data aggregation stops for departing accounts, delegated admin cleanup",
      "Tested database security across RDS, Aurora, and DynamoDB for auth enforcement gaps and injection vectors",
      "Applied GCP security concepts through independent research — IAM model differences, org policies, service account keys",
      "Performed architecture-level control validation — confirmed permission boundaries and enforcement points were implemented in both code and runtime",
    ],
    AI_LLM: [
      "Hijacked model behavior in production LLM systems via prompt injections through RAG docs, tool responses, URLs, and emails",
      "Poisoned RAG knowledge bases by injecting adversarial content and manipulating retrieval ranking",
      "Broke multi-agent pipeline boundaries by tracing implicit trust between agents without re-validation",
      "Extracted confidential system prompts through roleplay framing, persona injection, and iterative probing",
      "Bypassed safety controls through jailbreak chains: roleplay, many-shot, base64, language switching",
      "Assessed training data leakage and membership inference — probed for verbatim reproduction and record confirmation",
      "Reviewed fine-tuning attack surface — evaluated poisoning risks and isolation between fine-tuned variants",
      "Tested LLM feature authorization boundaries — confirmed models couldn't proxy unauthorized resource access",
      "Designed custom adversarial test cases and automated prompt injection scripts for coverage scaling",
      "Tested model output validation — identified injection paths where LLM-generated output was blindly trusted in queries, commands, and UI",
    ],
    MOBILE: [
      "Identified hardcoded secrets in app binaries by decompiling APKs/IPAs with apktool, jadx, MobSF",
      "Intercepted all HTTPS traffic by bypassing TLS pinning with Frida, Objection, iOS SSL Kill Switch",
      "Triggered unauthorized actions by abusing Android deeplinks and intent handling without caller validation",
      "Exposed JS bridge vulnerabilities in WebViews by testing interface exposure and cross-origin access",
      "Confirmed sensitive data in SharedPreferences, SQLite, plist, and Keychain persisted without encryption",
      "Bypassed root/jailbreak detection and anti-debug controls using Frida and Magisk modules",
      "Enumerated Android attack surface with Drozer — identified exported activities, content providers, broadcast receivers",
    ],
    CONTAINER: [
      "Mapped privilege escalation from workloads to cluster admin via K8s RBAC and ClusterRoleBinding misconfigs",
      "Demonstrated container escape via privileged flags, host path mounts, CAP_SYS_ADMIN capabilities",
      "Identified secrets in env vars, ConfigMaps, Dockerfile layers traceable to adjacent workloads",
      "Validated ECS task role permissions against least privilege — flagged unnecessary S3, Secrets Manager access",
      "Tested K8s API server for unauthenticated access, anonymous auth, insecure port binding",
      "Scanned Docker images with Trivy and Grype for CVEs, outdated bases, and embedded secrets",
    ],
    CODE_REVIEW: [
      "Discovered two scanner-invisible high-severity findings through manual code review — prototype pollution and postMessage XSS→ATO chain",
      "Prevented recurring vulnerability classes by authoring custom Semgrep rules integrated into CI/CD",
      "Traced untrusted input source-to-sink across Python, JS/TS, Java, C/C++, .NET, Rust, Ruby, Go, Bash",
      "Identified dangerous function patterns: strcpy, eval, exec, unsafe deserialization — confirmed exploitability through tracing",
      "Reviewed auth middleware consistency across all request paths — identified conditional skips and parameter bypass",
      "Assessed cryptographic implementations for algorithm choice, IV reuse, hardcoded keys, weak PRNG",
      "Identified race conditions and TOCTOU by reviewing shared state access and locking mechanisms",
      "Reviewed dependency supply chain — CVEs, EOL packages, transitive risk, lockfile integrity",
      "Performed STRIDE threat modeling, DFD trust zone mapping, attack surface enumeration at design time",
      "Scanned source code and repo history for hardcoded secrets, API keys, and credentials inadvertently committed",
    ],
    LOG_DETECT: [
      "Validated signal quality across CloudWatch/CloudTrail on every engagement — testing CRLF injection, debug exposure, parameter override",
      "Delivered engineering-ready reports with CWE mappings, CVSS scoring, exploit narratives, root-cause remediation",
      "Reviewed peer assessment reports — left structured comments on missing coverage, severity errors, unclear reproduction steps",
      "Partnered with engineering teams to prioritize fixes by exploitability and customer impact",
      "Provided finding-level improvement recommendations — flagged ambiguous impact statements and suggested remediation specificity",
    ],
  },
};

export const previousRoles = [
  {
    company: "HP Inc.",
    period: "Feb – Jul 2022",
    role: "Cybersecurity Engineer",
    location: "Bangalore",
    bullets: [
      "Exposed 20+ critical vulnerabilities including SQLi, XSS, CSRF, AuthN/AuthZ bypass, XXE, and race conditions by pentesting 6 production apps",
      "Traced root causes deeper than Veracode by performing manual code-level analysis and correlating SAST against runtime behavior",
      "Identified business logic flaws by manipulating multi-step workflows, request ordering, and retry behavior",
      "Demonstrated horizontal and vertical privilege escalation by abusing role boundaries and insufficient access control",
      "Standardized transport security validation by building Python automation for TLS/SSL checks across all 6 apps",
      "Produced developer-friendly reports with CWE, CVSS, reproduction steps, and retested every fix post-implementation",
      "Performed manual code review identifying insecure patterns, missing validation, and access control gaps SAST missed",
    ],
    decoration: "paper-clip",
  },
  {
    company: "HighRadius",
    period: "Jul 2021 – Feb 2022",
    role: "Security Consultant",
    location: "Hyderabad",
    bullets: [
      "Eliminated cross-tenant data exposure in Fortune 500 financial workflows by identifying IDOR and auth bypass across collections, cash application, and credit management",
      "Discovered broken auth — improper token handling, missing session invalidation, weak credential enforcement traced to code root cause",
      "Identified business logic flaws in financial workflows by abusing request ordering, state transitions, and retry behavior",
      "Found injection vulnerabilities (SQLi, XSS, CSRF) and API misconfigs across REST endpoints using Burp Suite Pro",
      "Detected sensitive data exposure — financial PII, credentials, and transaction details in API responses without access controls",
      "Prevented insecure releases by conducting secure design reviews on data flows and trust boundary assumptions",
      "Mapped privilege escalation paths using BloodHound and validated with Metasploit under scoped rules of engagement",
    ],
    decoration: "tape-strip",
  },
  {
    company: "ISRO",
    period: "Nov – Dec 2019",
    role: "Security Trainee",
    location: "Sriharikota",
    bullets: [
      "Reduced network attack surface by 30+ services across 20 production devices through Wireshark traffic analysis",
      "Led decommissioning of legacy protocols (FTP, Telnet) based on findings from independent investigation",
      "Enabled early threat detection by building custom monitoring for 30 critical assets",
      "Identified anomalous traffic patterns and unexpected service exposure that hadn't been previously flagged",
    ],
    decoration: "staple",
  },
];

export const capabilities = [
  {
    name: "Application Security",
    proficiency: 95,
    skills: ["Burp Suite Pro", "SQLMap", "XSS", "CSRF", "SSRF", "SSTI", "XXE", "Deserialization", "Business Logic", "Race Conditions", "State Machine Abuse", "File Upload Security", "Mass Assignment", "Second-Order Vulns", "Multi-step Workflows"],
  },
  {
    name: "API Security",
    proficiency: 92,
    skills: ["REST", "GraphQL", "gRPC", "SOAP", "WebSocket", "OAuth Flows", "JWT", "API Gateway Bypass", "HTTP Smuggling", "Protocol Switching", "Parameter Fuzzing", "Null Auth Testing", "Throttling Bypass", "Request ID Injection", "MQTT"],
  },
  {
    name: "Auth Testing",
    proficiency: 90,
    skills: ["IDOR", "Privilege Escalation", "Session Management", "MFA Bypass", "SAML", "OIDC", "RBAC", "Session Fixation", "Token Entropy", "Credential Stuffing", "Password Reset Abuse", "Brute Force Bypass", "OAuth Misconfig"],
  },
  {
    name: "Cloud AWS",
    proficiency: 93,
    skills: ["IAM", "S3", "EC2", "Lambda", "CloudFormation", "ScoutSuite", "Pacu", "Prowler", "AWSPorter", "PassRole", "Confused Deputy", "ABAC", "S3 Sniping", "Organizations", "Cross-Account Trust"],
  },
  {
    name: "Enterprise AD",
    proficiency: 75,
    skills: ["BloodHound", "Kerberoasting", "Pass-the-Hash", "LDAP", "GPO Abuse", "DCSync", "Lateral Movement", "Trust Abuse", "Service Account Audit", "Credential Exposure", "Metasploit", "Post-Exploitation"],
  },
  {
    name: "AI/LLM Security",
    proficiency: 88,
    skills: ["Prompt Injection", "RAG Poisoning", "Jailbreaks", "Agent Abuse", "System Prompt Extraction", "Tool Manipulation", "Training Data Leakage", "Membership Inference", "Fine-tuning Attacks", "MITRE ATLAS", "OWASP LLM Top 10", "PromptFoo", "Model Inversion", "Output Validation"],
  },
  {
    name: "Code Review",
    proficiency: 90,
    skills: ["Semgrep", "CodeQL", "Manual Taint Analysis", "Source-to-Sink", "Python", "JS/TS", "Java", "Go", "Rust", "C/C++", ".NET", "Ruby", "Bash", "Veracode", "SAST Rule Authorship"],
  },
  {
    name: "Secure Design",
    proficiency: 85,
    skills: ["Threat Modeling", "STRIDE", "Attack Trees", "Security Architecture Review", "Data Flow Diagrams", "Trust Zone Mapping", "Misuse Cases", "Defense-in-Depth", "Crypto Design Review", "Supply Chain Trust", "Security Requirements", "API Contract Review", "Feature Design Review"],
  },
  {
    name: "Mobile Security",
    proficiency: 82,
    skills: ["Frida", "Objection", "APK Decompilation", "IPA Analysis", "TLS Pinning Bypass", "Deeplink Abuse", "MobSF", "apktool", "jadx", "Drozer", "WebView Attacks", "JS Bridge", "Root Detection Bypass", "ADB Testing", "Xposed"],
  },
  {
    name: "Container & K8s",
    proficiency: 80,
    skills: ["Docker Escape", "K8s RBAC", "Pod Security", "Helm Charts", "Container Runtime", "Falco", "Trivy", "Grype", "ECS Task Roles", "Network Policy", "API Server Exposure", "ConfigMap Secrets", "Image Hardening"],
  },
  {
    name: "Transport & Network",
    proficiency: 78,
    skills: ["TLS/SSL", "Certificate Pinning", "Wireshark", "Nmap", "Protocol Analysis", "mTLS", "testssl.sh", "OpenSSL", "Protocol Downgrade", "SlowLoris", "TCP/UDP Enum", "Security Headers", "Network Exposure"],
  },
  {
    name: "Log & Forensics",
    proficiency: 76,
    skills: ["CloudWatch", "CloudTrail", "Splunk", "Log Injection", "CRLF", "SIEM Validation", "Log Retention", "Debug Exposure", "Sensitive Data in Logs", "Parameter Override", "Log Group Misconfig", "Signal Analysis", "Event Completeness"],
  },
  {
    name: "Runtime & Detection",
    proficiency: 74,
    skills: ["WAF Bypass", "EDR Evasion", "AMSI", "Syscall Hooks", "eBPF", "Behavioral Analysis", "Control Drift", "Signal Quality", "CloudWatch Alarms", "Detection Coverage", "Abuse Simulation", "Gap Analysis"],
  },
  {
    name: "Secure SDLC",
    proficiency: 85,
    skills: ["CI/CD Security", "SAST", "DAST", "SCA", "DevSecOps", "Pipeline Hardening", "Dependency Review", "Pre-release Assessments", "Vuln Triage", "Remediation Validation", "Security Guardrails", "Peer Report Review", "Agile Integration"],
  },
  {
    name: "Binary & Low-Level",
    proficiency: 70,
    skills: ["Ghidra", "pwntools", "Buffer Overflow", "ROP", "Format Strings", "Heap Exploitation", "Memory Corruption", "Exploit Automation", "Syscall Hooking", "ASLR/NX Bypass", "Stack Canaries", "Reverse Engineering"],
  },
  {
    name: "Vulnerability Classes",
    proficiency: 95,
    skills: ["OWASP Top 10", "CWE Top 25", "SANS Top 25", "CVSS Scoring", "CVE Research", "Zero-Day Analysis", "Prototype Pollution", "HTTP Smuggling", "TOCTOU", "Confused Deputy", "Bucket Sniping", "Parser Differential", "ReDoS", "Multi-tenant Isolation"],
  },
  {
    name: "Reporting",
    proficiency: 92,
    skills: ["Executive Summaries", "Technical Write-ups", "Exploit Narratives", "Remediation Guidance", "Risk Rating", "CWE Mapping", "CVSS Scoring", "Peer Review", "Severity Recommendations", "Stakeholder Prioritization", "Retest Validation", "Non-technical Summaries", "Finding Clarity"],
  },
  {
    name: "WordPress & CMS",
    proficiency: 80,
    skills: ["WPScan", "Plugin Auditing", "Theme Review", "REST API", "XML-RPC", "Webhook Security", "PHP Source Audit", "permission_callback", "AJAX Handler Auth", "Nonce vs Auth", "Payment Verification", "CORS Exploitation", "Docker Testing", "CVE Disclosure"],
  },
  {
    name: "Browser Security",
    proficiency: 82,
    skills: ["CSP Bypass", "Trusted Types", "SOP", "CORS", "Cookie Security", "postMessage", "Service Workers", "C++ Renderer Analysis", "Fuzzing Harnesses", "ASAN/MSAN/UBSAN", "Crypto Protocol Analysis", "Build Pipeline Review", "Differential Analysis"],
  },
  {
    name: "Cryptography",
    proficiency: 75,
    skills: ["Applied Crypto", "Key Management", "Hash Cracking", "Padding Oracle", "Cipher Suite Analysis", "AES/CBC/CTR/GCM", "RSA/ECC", "Diffie-Hellman", "Zero-Knowledge Proofs", "zk-SNARKs", "MPC", "IV Misuse", "Timing Attacks", "TLS Composition"],
  },
];

export const education = [
  {
    institution: "Georgia Institute of Technology",
    degree: "MS Cybersecurity",
    period: "2022 – 2023",
    details: "Coursework in Applied Cryptography, Network Security, Binary Exploitation, Secure Systems Design",
  },
  {
    institution: "SRM Institute of Science and Technology",
    degree: "BTech Computer Science",
    period: "2018 – 2022",
    details: "",
  },
];

export const certifications = [
  { name: "OSCP", fullName: "Offensive Security Certified Professional", org: "Offensive Security", year: "2023" },
  { name: "PNPT", fullName: "Practical Network Penetration Tester", org: "TCM Security", year: "2022" },
  { name: "CC", fullName: "Certified in Cybersecurity", org: "ISC²", year: "2023" },
  { name: "CEH", fullName: "Certified Ethical Hacker", org: "EC-Council", year: "2021" },
  { name: "CND", fullName: "Certified Network Defender", org: "EC-Council", year: "2021" },
];

export const ctfs = [
  { name: "Flipkart Grid", result: "Semi-finalist", pool: "3000+" },
  { name: "NahamCon CTF", result: "Top Third", pool: "" },
  { name: "Red Team Academy", result: "5th Place", pool: "50+" },
];

export interface Finding {
  id: string;
  title: string;
  platform: string;
  cvss: number;
  severity: "Critical" | "High" | "Medium" | "Low";
  cwe?: string;
  description: string;
  cardStyle?: number;
}

export const evidencePlatforms = [
  {
    name: "WordPress",
    count: 28,
    findings: [
      // 1. Widget Options — RCE
      { id: "wp-1", title: "Widget Options — RCE via eval Bypass", platform: "WordPress", cvss: 9.9, severity: "Critical" as const, cwe: "CWE-94", description: "Contributor-level RCE through an eval bypass combined with a save filter bypass in the Widget Options plugin. Crafted payloads circumvented sanitization to achieve arbitrary code execution on the server." },
      // 2. W3 Total Cache — mfunc Command Injection
      { id: "wp-2", title: "W3 Total Cache — mfunc Command Injection", platform: "WordPress", cvss: 8.1, severity: "High" as const, cwe: "CWE-78", description: "Unauthenticated command injection via str_replace bypass in W3 Total Cache's mfunc directive. The caching engine processed embedded PHP through mfunc tags, allowing arbitrary command execution." },
      // 3. WPForms PayPal Webhook Forgery
      { id: "wp-3", title: "WPForms (6M+) — PayPal Webhook Forgery", platform: "WordPress", cvss: 8.2, severity: "High" as const, cwe: "CWE-345", description: "6M+ installations accepted forged payment notifications with zero cryptographic verification. Stripe and Square webhooks in the same plugin use constructEvent() signature verification; PayPal webhook uses raw json_decode with no signature check." },
      // 4. Contact Form 7 PayPal — IPN Payment Bypass
      { id: "wp-4", title: "CF7 PayPal (200K+) — IPN Payment Bypass", platform: "WordPress", cvss: 7.5, severity: "High" as const, cwe: "CWE-345", description: "IPN endpoint verified the transaction was real with PayPal but never checked payment amount, receiver email, or transaction uniqueness — allowing forged payment completions for any form submission." },
      // 5. CF7 PayPal — Missing Auth AJAX (connection test)
      { id: "wp-5", title: "CF7 PayPal — Missing Auth AJAX (Connection Test)", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-862", description: "AJAX handler for PayPal connection testing lacked capability checks. Any logged-in user could trigger connection tests and observe responses containing integration status." },
      // 6. CF7 PayPal — Missing Auth AJAX (feed management)
      { id: "wp-6", title: "CF7 PayPal — Missing Auth AJAX (Feed Mgmt)", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-862", description: "Feed management AJAX handler used nonce verification but no capability check — any logged-in user could create, modify, or delete payment feed configurations." },
      // 7. CF7 PayPal — Missing Auth AJAX (settings update)
      { id: "wp-7", title: "CF7 PayPal — Missing Auth AJAX (Settings)", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-862", description: "Settings update AJAX handler confused CSRF protection (nonce) with authorization (capability check). Any authenticated user could modify plugin-wide payment settings." },
      // 8. CF7 PayPal — Stored XSS in form settings
      { id: "wp-8", title: "CF7 PayPal — Stored XSS in Form Settings", platform: "WordPress", cvss: 6.1, severity: "Medium" as const, cwe: "CWE-79", description: "Unescaped user input stored in form settings and feed configuration fields rendered in admin pages, enabling persistent XSS affecting all admin users viewing the settings." },
      // 9. CF7 PayPal — SSL Verification Disabled
      { id: "wp-9", title: "CF7 PayPal — SSL Verification Disabled", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-295", description: "All external API calls to PayPal used sslverify => false, disabling certificate validation and enabling MitM interception of payment data in transit." },
      // 10. CF7 PayPal — Payment Data in Cleartext Cookies
      { id: "wp-10", title: "CF7 PayPal — Payment Data in Cleartext Cookies", platform: "WordPress", cvss: 4.3, severity: "Medium" as const, cwe: "CWE-312", description: "Payment transaction data including order details stored in cleartext browser cookies without encryption or integrity protection, accessible to any JavaScript on the page." },
      // 11. MetForm — CSRF to WooCommerce Product Creation
      { id: "wp-11", title: "MetForm — CSRF to WooCommerce Product Creation", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-352", description: "Missing CSRF protection on form handler allowed attackers to trick authenticated admins into creating arbitrary WooCommerce products through crafted cross-site requests." },
      // 12. MetForm — SSL Disabled on 7 API calls
      { id: "wp-12", title: "MetForm — SSL Disabled on 7 API Calls", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-295", description: "Seven separate external API integrations shipped with sslverify => false — developers disabled SSL verification during development and never re-enabled it for production." },
      // 13. MetForm — Missing Auth on Form Entry Export
      { id: "wp-13", title: "MetForm — Missing Auth on Form Entry Export", platform: "WordPress", cvss: 6.5, severity: "Medium" as const, cwe: "CWE-862", description: "Form entry export handler lacked proper authorization checks, allowing any authenticated user to export all submitted form data including sensitive user information." },
      // 14. MetForm — Debug Files in Web-Accessible Dir
      { id: "wp-14", title: "MetForm — Debug Files in Web-Accessible Dir", platform: "WordPress", cvss: 3.7, severity: "Low" as const, cwe: "CWE-532", description: "Debug log files containing API responses, error traces, and integration details written to a web-accessible directory without access restrictions." },
      // 15. OptinMonster — REST Endpoint Leaks WooCommerce Revenue
      { id: "wp-15", title: "OptinMonster (1M+) — REST Leaks Revenue Data", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "REST endpoint with permission_callback => __return_true leaked WooCommerce revenue data cross-origin via WordPress CORS behavior (Origin reflection + Access-Control-Allow-Credentials: true)." },
      // 16. Limit Login Attempts — Stored XSS via Lockout Email
      { id: "wp-16", title: "Limit Login Attempts (2M+) — Stored XSS", platform: "WordPress", cvss: 6.1, severity: "Medium" as const, cwe: "CWE-79", description: "Stored XSS in lockout notification email via unescaped username field. Attacker-controlled username rendered without sanitization in admin notification emails." },
      // 17. Elementor — CSRF on Flexbox Migration
      { id: "wp-17", title: "Elementor (5M+) — CSRF on Flexbox Migration", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-352", description: "Missing CSRF protection on the Flexbox container migration endpoint. An attacker could trick an admin into triggering site-wide layout migration through a crafted request." },
      // 18. Yoast SEO — Missing Nonce on ajax_restore_notification
      { id: "wp-18", title: "Yoast SEO (5M+) — Missing Nonce on Restore", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-352", description: "ajax_restore_notification handler lacked nonce verification while its sibling ajax_dismiss_notification had it — classic differential analysis finding across sibling handlers." },
      // 19. Yoast SEO — Missing Auth on REST Endpoint
      { id: "wp-19", title: "Yoast SEO — Missing Auth on REST Endpoint", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "REST endpoint accessible without proper authorization checks, exposing SEO configuration data and internal site metadata to any authenticated user." },
      // 20. Yoast Duplicate Post — IDOR on Rewrite and Republish
      { id: "wp-20", title: "Yoast Duplicate Post — IDOR on Rewrite", platform: "WordPress", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-639", description: "Bulk handler checked edit_post per-post, but the link handler only checked generic copy_posts capability — allowing unauthorized rewrite and republish of other users' posts." },
      // 21. Jetpack — Missing Auth on AI Content Settings
      { id: "wp-21", title: "Jetpack (5M+) — Missing Auth on AI Settings", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "AI content generation settings endpoint lacked authorization checks, allowing any authenticated user to modify AI-powered content generation configuration." },
      // 22. LiteSpeed Cache — Missing Auth on Cache Purge
      { id: "wp-22", title: "LiteSpeed Cache (6M+) — Missing Auth on Purge", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "Cache purge handler accessible without proper capability checks, enabling any authenticated user to purge the entire site cache and cause performance degradation." },
      // 23. Hostinger — Missing Auth on AddFormNotice
      { id: "wp-23", title: "Hostinger (1M+) — Missing Auth on AddFormNotice", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "AddFormNotice handler lacked current_user_can check while its sibling ConnectionNotice handler had it — differential analysis finding showing inconsistent security controls." },
      // 24. Hostinger — REST Endpoint Leaks HubSpot API Key
      { id: "wp-24", title: "Hostinger — REST Leaks HubSpot API Key", platform: "WordPress", cvss: 7.5, severity: "High" as const, cwe: "CWE-200", description: "REST endpoint exposed HubSpot API credentials to authenticated users without admin privileges, enabling unauthorized access to the site's marketing automation platform." },
      // 25. MonsterInsights — Missing Auth on get_ads_token
      { id: "wp-25", title: "MonsterInsights (3M+) — Missing Auth on Token", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "get_ads_token endpoint lacked capability checks while its sibling get_ads_settings checked properly — another example of the nonce-does-not-equal-authorization pattern." },
      // 26. ACF — Shortcode Information Disclosure
      { id: "wp-26", title: "ACF (2M+) — Shortcode Information Disclosure", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-200", description: "Shortcode processing exposed sensitive custom field data to users without proper capability verification, leaking internal content meant for privileged roles." },
      // 27. Starter Templates — Missing Auth on Template Import
      { id: "wp-27", title: "Starter Templates (1M+) — Missing Auth Import", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-862", description: "Template import handler lacked proper authorization, allowing any authenticated user to import and overwrite site templates and design configurations." },
      // 28. Loco Translate — Directory Traversal
      { id: "wp-28", title: "Loco Translate — Directory Traversal", platform: "WordPress", cvss: 5.3, severity: "Medium" as const, cwe: "CWE-22", description: "Directory traversal via ../ in filename parameter allowed reading and writing translation files outside the intended directory, potentially overwriting critical plugin files." },
    ],
  },
  {
    name: "AWS SDK",
    count: 13,
    findings: [
      // 1. CloudFormation CLI — Command Injection Docker
      { id: "aws-1", title: "CloudFormation CLI — Command Injection Docker", platform: "AWS SDK", cvss: 8.2, severity: "High" as const, cwe: "CWE-78", description: "Exploited a shell injection path in the CloudFormation CLI Docker entrypoint. json.dumps() escaped double quotes but not single quotes, allowing breakout into arbitrary command execution. Confirmed exfiltration of STS credentials through three distinct input paths." },
      // 2. CloudFormation CLI — SSRF + File Read Schema Loader
      { id: "aws-2", title: "CloudFormation CLI — SSRF + File Read Schema", platform: "AWS SDK", cvss: 7.4, severity: "High" as const, cwe: "CWE-918", description: "Schema loader accepted arbitrary URLs and file:// paths, enabling SSRF to internal services and arbitrary file read from the host filesystem including AWS credentials." },
      // 3. CodeDeploy — Command Injection Windows
      { id: "aws-3", title: "CodeDeploy — Command Injection Windows", platform: "AWS SDK", cvss: 7.3, severity: "High" as const, cwe: "CWE-78", description: "Command injection vulnerability in the AWS CLI CodeDeploy module on Windows platforms. Unsanitized input passed to shell execution allowed arbitrary command execution during deployment operations." },
      // 4. CLI — Symlink Traversal Artifact Export
      { id: "aws-4", title: "CLI — Symlink Traversal Artifact Export", platform: "AWS SDK", cvss: 6.5, severity: "Medium" as const, cwe: "CWE-59", description: "Symlink traversal during CloudFormation artifact export allowed reading arbitrary files from the host. Path validation checked the symlink name but not its target." },
      // 5. Chalice — Zip Slip File Write
      { id: "aws-5", title: "Chalice — Zip Slip Arbitrary File Write", platform: "AWS SDK", cvss: 6.5, severity: "Medium" as const, cwe: "CWE-22", description: "Zip Slip vulnerability in AWS Chalice allowed arbitrary file write through crafted zip archives with directory traversal sequences in filenames during Lambda package extraction." },
      // 6. SAM CLI — Zip Symlink File Read
      { id: "aws-6", title: "SAM CLI — Zip Symlink Arbitrary File Read", platform: "AWS SDK", cvss: 6.3, severity: "Medium" as const, cwe: "CWE-59", description: "SAM CLI validated symlink creation paths but not symlink targets during zip extraction. A crafted Lambda deployment package could read arbitrary host files including ~/.aws/credentials. Four distinct code paths to the vulnerable sink." },
      // 7. SAM CLI — OIDC SSRF
      { id: "aws-7", title: "SAM CLI — Two-Stage SSRF via OIDC", platform: "AWS SDK", cvss: 5.4, severity: "Medium" as const, cwe: "CWE-918", description: "Two-stage SSRF through OIDC provider URL manipulation. Attacker-controlled provider URL triggered server-side requests to arbitrary endpoints during token validation." },
      // 8. SAM CLI — Tar Symlink Escape
      { id: "aws-8", title: "SAM CLI — Tar Symlink Escape", platform: "AWS SDK", cvss: 4.8, severity: "Medium" as const, cwe: "CWE-22", description: "Unfiltered tar extraction followed symlinks outside the intended directory, enabling file read from host filesystem through crafted Lambda layer archives." },
      // 9. SAM CLI — Swagger Path Traversal
      { id: "aws-9", title: "SAM CLI — Swagger Path Traversal", platform: "AWS SDK", cvss: 4.7, severity: "Medium" as const, cwe: "CWE-22", description: "Path traversal in Swagger/OpenAPI template processing allowed reading files outside the intended project directory through crafted API definition references." },
      // 10. SDK — SSO Token World-Readable
      { id: "aws-10", title: "SDK — SSO Token Cache World-Readable", platform: "AWS SDK", cvss: 5.5, severity: "Medium" as const, cwe: "CWE-732", description: "writeSSOTokenToFile uses fs.writeFile() without specifying mode, defaulting to 0o644 (world-readable). SSO token cache contains accessToken, clientSecret, and refreshToken. AWS CLI (Python) already writes with 0o600." },
      // 11. SDK — IAM Authenticator Partition Bug
      { id: "aws-11", title: "SDK — IAM Authenticator Partition Bug", platform: "AWS SDK", cvss: 7.5, severity: "High" as const, cwe: "CWE-697", description: "SSOArnLike() assigns partition='aws' when SSO.Partition is empty but never assigns when non-empty (missing else branch). Silent authentication denial for all users in China and GovCloud regions." },
      // 12. SDK — Debug Logger Token Leak
      { id: "aws-12", title: "SDK — Debug Logger Token Leak", platform: "AWS SDK", cvss: 5.5, severity: "Medium" as const, cwe: "CWE-532", description: "SDK redacts security-sensitive headers but logs query parameters in plaintext. Presigned URLs put credentials in query params. Any app with debug logging writes full credentials to logs." },
      // 13. SDK — SSRF via bucketEndpoint
      { id: "aws-13", title: "SDK — SSRF via bucketEndpoint Option", platform: "AWS SDK", cvss: 9.8, severity: "Critical" as const, cwe: "CWE-918", description: "When bucketEndpoint: true, S3 client treats Bucket parameter as a complete URL. Bucket name validation is skipped entirely. User input in Bucket parameter sends requests to arbitrary hosts including EC2 IMDS for credential theft." },
    ],
  },
  {
    name: "Android DIBZ",
    count: 8,
    findings: [
      // 1. Hardcoded Airship Credentials
      { id: "dibz-1", title: "Hardcoded Airship Credentials", platform: "Android DIBZ", cvss: 9.1, severity: "Critical" as const, cwe: "CWE-798", description: "Production Urban Airship App Key and App Secret in plaintext in assets/airshipconfig.properties. Development and production credentials identical (no environment separation). Impact: send push notifications to every DIBZ user — on a real-money gambling app, one API call from phishing every user." },
      // 2. Facebook App ID + Token
      { id: "dibz-2", title: "Facebook App ID + Client Token", platform: "Android DIBZ", cvss: 7.5, severity: "High" as const, cwe: "CWE-798", description: "Facebook App ID and Client Token embedded in res/values/strings.xml. Token validated live against the Graph API, confirming real access to Facebook platform integration." },
      // 3. GCP API Key
      { id: "dibz-3", title: "GCP API Key Exposure", platform: "Android DIBZ", cvss: 7.5, severity: "High" as const, cwe: "CWE-798", description: "Hardcoded Google Cloud Platform API key discovered in app resources. GCP Project ID leaked via error response, enabling further reconnaissance against cloud infrastructure." },
      // 4. Internal Infra Exposure
      { id: "dibz-4", title: "Internal Infrastructure Exposure", platform: "Android DIBZ", cvss: 7.3, severity: "High" as const, cwe: "CWE-200", description: "Internal hostnames and infrastructure endpoints extracted from network_security_config.xml and the JS bundle. Live DNS resolution confirmed — exposing internal staging, development, and production infrastructure." },
      // 5. Deep Link Injection (3 vectors)
      { id: "dibz-5", title: "Deep Link Injection (3 Vectors)", platform: "Android DIBZ", cvss: 7.1, severity: "High" as const, cwe: "CWE-939", description: "Three attack vectors: custom scheme (dibz://) with no host/path restrictions (zero-click app launch), App Link with autoVerify=true (Android opens silently), and parameter injection via onNewIntent() passing raw intent data to React Native with zero validation. Routes include /deposit and /personaldetails." },
      // 6. Unobfuscated JS Bundle
      { id: "dibz-6", title: "Unobfuscated JS Bundle", platform: "Android DIBZ", cvss: 7.0, severity: "High" as const, cwe: "CWE-540", description: "7.9 MB unobfuscated React Native bundle. Extracted 60+ REST API endpoints, 100+ GraphQL operations including IntrospectionQuery, multi-brand shared code referencing skybet/betfair/casino, and the complete authentication flow." },
      // 7. Backup + Client PIN
      { id: "dibz-7", title: "Backup Enabled + Client-Side PIN Storage", platform: "Android DIBZ", cvss: 6.8, severity: "Medium" as const, cwe: "CWE-312", description: "allowBackup=true combined with client-side PIN hash storage. 4-digit PIN brute-forceable in under 1 second. ADB backup extracts all app data including the PIN hash." },
      // 8. Cleartext Traffic
      { id: "dibz-8", title: "Cleartext Traffic Permitted", platform: "Android DIBZ", cvss: 5.9, severity: "Medium" as const, cwe: "CWE-319", description: "usesCleartextTraffic=true set globally in the manifest. Development hostnames present in production build. All HTTP traffic susceptible to interception on shared networks." },
    ],
  },
  {
    name: "Brave Browser",
    count: 4,
    findings: [
      // 1. Trusted Types CSP Bypass
      { id: "brave-1", title: "Trusted Types CSP Bypass", platform: "Brave Browser", cvss: 7.5, severity: "High" as const, cwe: "CWE-79", description: "A browser ad-blocker scriptlet silently registered a default Trusted Types policy as a pure passthrough, neutralizing DOM XSS protection for every page where the scriptlet was injected. Found through differential analysis comparing sibling scriptlets." },
      // 2. Enclave Key State Corruption
      { id: "brave-2", title: "Enclave Key Sync State Corruption", platform: "Brave Browser", cvss: 6.3, severity: "Medium" as const, cwe: "CWE-755", description: "Missing error returns in Go code caused enclave key synchronization to proceed despite failures, corrupting key state. Users could lose access to synced data across devices with no indication of the failure." },
      // 3. Token Forgery Blind Signing
      { id: "brave-3", title: "Token Forgery via Blind Signing Protocol", platform: "Brave Browser", cvss: 7.5, severity: "High" as const, cwe: "CWE-347", description: "Vulnerability in the Rust implementation of the VOPRF/Privacy Pass blind signing protocol allowed token forgery by manipulating the identity point. Forged tokens could be used to bypass verification without valid issuance." },
      // 4. Tor Transport Missing Integrity
      { id: "brave-4", title: "Tor Transport Missing Integrity Verification", platform: "Brave Browser", cvss: 8.0, severity: "High" as const, cwe: "CWE-345", description: "Tor transport binaries downloaded and executed without integrity verification in the JavaScript/Node.js layer. A MitM attacker could substitute malicious binaries, compromising Tor connectivity and user privacy." },
    ],
  },
  {
    name: "HackerOne",
    count: 7,
    findings: [
      // 1. Vercel Prototype Pollution
      { id: "h1-1", title: "Vercel @vercel/flags Prototype Pollution", platform: "HackerOne", cvss: 7.2, severity: "High" as const, cwe: "CWE-1321", description: "Prototype pollution in Vercel's @vercel/flags package through deep merge on user-controlled JSON input. __proto__ pollution cascaded into flag evaluation logic, potentially affecting feature flags across all users." },
      // 2. Vercel Host Header SSRF
      { id: "h1-2", title: "Vercel Next.js Host Header SSRF", platform: "HackerOne", cvss: 7.1, severity: "High" as const, cwe: "CWE-918", description: "Host header manipulation in Next.js triggered server-side requests to attacker-controlled hosts with token leakage. Internal service endpoints reachable through crafted Host values." },
      // 3. Vercel CLI Env Injection
      { id: "h1-3", title: "Vercel CLI Environment Variable Injection", platform: "HackerOne", cvss: 6.8, severity: "Medium" as const, cwe: "CWE-78", description: "Environment variable injection through the Vercel CLI allowed injecting arbitrary values into the deployment environment, potentially overriding security-critical configuration." },
      // 4. Slack Nebula Unauth Teardown
      { id: "h1-4", title: "Slack Nebula — Unauth Tunnel Teardown", platform: "HackerOne", cvss: 5.9, severity: "Medium" as const, cwe: "CWE-345", description: "Unauthenticated CloseTunnel messages accepted without verification, allowing any network-adjacent attacker to tear down active Nebula VPN tunnels and disrupt connectivity." },
      // 5. Tron PBFT Bypass
      { id: "h1-5", title: "Tron — PBFT Zero-Signature Bypass", platform: "HackerOne", cvss: 8.6, severity: "High" as const, cwe: "CWE-345", description: "validPbftSign() unconditionally returned true when the signature list was empty, bypassing the entire PBFT quorum verification. Allowed unauthenticated injection of forged finality data with nothing but a TCP connection to the P2P port." },
      // 6. Discourse Invite Race
      { id: "h1-6", title: "Discourse — Invite Redemption Race Condition", platform: "HackerOne", cvss: 5.9, severity: "Medium" as const, cwe: "CWE-367", description: "Race condition in invite redemption allowed multiple accounts to claim the same single-use invite token through concurrent requests, bypassing invite limits and access controls." },
      // 7. Airtable AI Chat IDOR
      { id: "h1-7", title: "Airtable — AI Chat IDOR", platform: "HackerOne", cvss: 7.5, severity: "High" as const, cwe: "CWE-639", description: "Insecure direct object reference in Airtable's AI chat feature allowed accessing other users' AI conversation histories and data through parameter manipulation." },
    ],
  },
  {
    name: "Professional",
    count: 120,
    findings: [
      // 1. postMessage XSS → Full Account Takeover
      { id: "pro-1", title: "postMessage XSS → Full Account Takeover", platform: "Professional", cvss: 9.3, severity: "Critical" as const, cwe: "CWE-79", description: "4-step invisible chain: XSS via window.postMessage → CSRF token harvested from Rails GET endpoint → secondary XSS through the same postMessage channel → CSRF token used to update account profile. Full account takeover with zero user interaction. No scanner flagged any step." },
      // 2. Prototype Pollution
      { id: "pro-2", title: "Prototype Pollution — Bureau Veritas", platform: "Professional", cvss: 8.2, severity: "High" as const, cwe: "CWE-1321", description: "Prototype pollution in a JavaScript dependency allowed attackers to access and manipulate shared objects across the application's prototype chain — affecting application-wide state across every user session. Found by manually tracing how untrusted input propagated through dependency code." },
      // 3. Stored XSS → Headless Browser Admin Escalation
      { id: "pro-3", title: "Stored XSS → Headless Browser Admin Escalation", platform: "Professional", cvss: 9.0, severity: "Critical" as const, cwe: "CWE-79", description: "Stored XSS payload in user comment field executed when an internal headless browser agent loaded the page with admin-level session context. Zero interaction required — a single comment submission granted full privileged API access, resource creation/modification/deletion, and pivot to internal systems." },
      // 4. State Government Portal IDOR
      { id: "pro-4", title: "State Government Portal IDOR", platform: "Professional", cvss: 8.6, severity: "High" as const, cwe: "CWE-639", description: "Systemic authorization failure across an entire state government scholarship portal. Sequential integer IDs with zero authorization checks exposed passport documents, visa records, financial data, and contact information. Validated across document upload, application management, and status tracking workflows." },
      // 5. 100+ vulnerabilities across 40+ AWS services (aggregate)
      { id: "pro-5", title: "100+ Vulns Across 40+ AWS Services", platform: "Professional", cvss: 8.0, severity: "High" as const, cwe: "CWE-862", description: "Comprehensive security assessment findings across 40+ AWS services at Bureau Veritas — 100+ vulnerabilities identified (20+ high-severity) spanning authorization failures, isolation gaps, data exposure, and trust boundary abuse across backend APIs, cloud control planes, and AI-integrated features." },
      // 6. 20+ critical vulnerabilities across 6 apps (aggregate)
      { id: "pro-6", title: "20+ Critical Vulns Across 6 Apps — HP Inc.", platform: "Professional", cvss: 8.5, severity: "High" as const, cwe: "CWE-287", description: "20+ critical vulnerabilities identified across 6 production applications at HP Inc. including SQLi, XSS, CSRF, AuthN/AuthZ bypass, XXE, and race conditions. Manual code review found insecure patterns, missing validation, and access control gaps that SAST missed entirely." },
    ],
  },
];

export const hallOfFame = [
  {
    rank: 1,
    title: "postMessage XSS → ATO",
    source: "Bureau Veritas",
    cvss: 9.3,
    severity: "Critical" as const,
    significance: "Demonstrated a 4-step invisible chain that no automated scanner could detect — each link harmless alone, devastating together. Found through manual code review during an AWS engagement.",
    narrative: "XSS delivered via window.postMessage to a permissive listener. The payload harvested a CSRF token from a Rails GET endpoint, then fired a secondary XSS through the same postMessage channel. The CSRF token was used to update the victim's account profile — achieving complete account takeover without any user interaction beyond visiting an attacker-controlled page. Root cause traced to source, reproduction steps documented.",
  },
  {
    rank: 2,
    title: "Prototype Pollution",
    source: "Bureau Veritas",
    cvss: 8.2,
    severity: "High" as const,
    significance: "Proved that a single polluted prototype key could compromise application-wide state across every user session simultaneously. No automated tool flagged it.",
    narrative: "Identified during a separate AWS engagement through manual code review. A deep merge operation on user-controlled JSON input allowed __proto__ pollution in a JavaScript dependency. The pollution cascaded through the prototype chain, affecting shared objects across the entire application — not scoped to a single user or session. Found by tracing how untrusted input propagated through dependency code and recognizing the pollution pattern manually.",
  },
  {
    rank: 3,
    title: "Stored XSS → Headless Admin",
    source: "HP Inc.",
    cvss: 9.0,
    severity: "Critical" as const,
    significance: "Showed that a single user comment could silently hijack an admin-level automated agent — zero interaction required, full privileged access gained. The attack required only a standard user account.",
    narrative: "The application allowed end users to submit comments that were later retrieved and rendered by an internal agent running in a headless browser without output sanitization. A crafted XSS payload stored in the comment field executed automatically when the agent loaded the page, inheriting the agent's admin-level session context. From that position, it was possible to perform privileged administrative actions and pivot to internal systems — none of which required interaction from an actual admin user. Root cause traced to missing sanitization on stored user input rendered in a trusted execution context.",
  },
  {
    rank: 4,
    title: "State Government IDOR",
    source: "Responsible Disclosure",
    cvss: 8.6,
    severity: "High" as const,
    significance: "Exposed systemic authorization failure across an entire government portal — passport documents, visa records, and financial data of thousands accessible through simple parameter manipulation.",
    narrative: "Identified in a production state government scholarship portal. Abused API parameter trust and insufficient authorization enforcement to demonstrate horizontal privilege escalation. Sequential integer IDs with zero authorization checks on document retrieval endpoints exposed sensitive PII. Validated exploitability across multiple workflows (document upload, application management, status tracking), confirming systemic failure rather than a single endpoint flaw. Full reproduction steps and remediation guidance provided directly to the agency's engineering team.",
  },
  {
    rank: 5,
    title: "CloudFormation CLI Injection",
    source: "AWS VDP",
    cvss: 8.2,
    severity: "High" as const,
    significance: "Turned a quoting oversight in json.dumps() into full AWS credential theft — three distinct input paths to the same devastating sink. Working PoC confirmed STS credential exfiltration.",
    narrative: "Exploited a shell injection path in the CloudFormation CLI Docker entrypoint. json.dumps() escaped double quotes but not single quotes, allowing breakout from the shell quoting context into arbitrary command execution inside the container. Confirmed exfiltration of STS credentials (AccessKeyId, SecretAccessKey, SessionToken) through three distinct input paths — stack parameter values, resource names, and output references. Delivered working PoC and a fix recommendation to switch to Docker exec form.",
  },
  {
    rank: 6,
    title: "DIBZ Hardcoded Credentials",
    source: "HackerOne / Flutter",
    cvss: 9.1,
    severity: "Critical" as const,
    significance: "Production push notification keys in plaintext with no environment separation — on a real-money gambling app where phishing every user was one API call away.",
    narrative: "Production Urban Airship App Key and App Secret discovered in plaintext in assets/airshipconfig.properties. Development and production credentials were identical (no environment separation). For a real-money gambling app like DIBZ (Flutter Entertainment — Betfair, Paddy Power, Sky Bet), this enabled sending push notifications to every user, creating highly effective phishing at scale. Additional hardcoded credentials found: Facebook App ID + Token, GCP API Key, and internal infrastructure hostnames with live DNS resolution.",
  },
  {
    rank: 7,
    title: "SDK SSRF via bucketEndpoint",
    source: "AWS VDP",
    cvss: 9.8,
    severity: "Critical" as const,
    significance: "When bucketEndpoint is true, the S3 client treats the Bucket parameter as a complete URL with zero validation — user input sends requests to arbitrary hosts including EC2 IMDS.",
    narrative: "When the bucketEndpoint option is enabled, the AWS SDK S3 client treats the Bucket parameter as a complete URL instead of a bucket name. Bucket name validation is skipped entirely. Any application accepting user input for the Bucket parameter becomes an open SSRF proxy — sending requests to arbitrary hosts including the EC2 Instance Metadata Service for credential theft. The attack requires only a single parameter manipulation to steal IAM role credentials from any EC2 instance running the vulnerable configuration.",
  },
  {
    rank: 8,
    title: "Tron PBFT Bypass",
    source: "HackerOne",
    cvss: 8.6,
    severity: "High" as const,
    significance: "An empty signature list bypassed the entire blockchain consensus mechanism — forged finality data injectable with nothing but a TCP connection.",
    narrative: "validPbftSign() unconditionally returned true when the signature list was empty, bypassing PBFT quorum verification and signature validation entirely. This allowed unauthenticated injection of forged solidification data into the blockchain finality layer. Zero privileges required — only a TCP connection to the P2P port. The vulnerability undermined the fundamental trust guarantees of the Tron blockchain's consensus mechanism.",
  },
  {
    rank: 9,
    title: "WPForms Webhook Forgery",
    source: "Wordfence",
    cvss: 8.2,
    severity: "High" as const,
    significance: "6M+ WordPress installations accepted forged payment notifications with zero cryptographic verification — while sibling handlers in the same plugin verified correctly.",
    narrative: "The WPForms PayPal Commerce webhook handler accepted raw json_decode(file_get_contents('php://input')) without any signature verification. Stripe and Square webhooks in the same plugin use constructEvent() for proper signature verification — a classic differential analysis finding. Anonymous attackers could mark pending payments as completed or cancel active subscriptions across all 6M+ installations using nothing but forged HTTP requests.",
  },
  {
    rank: 10,
    title: "Trusted Types CSP Bypass",
    source: "Brave VDP",
    cvss: 7.5,
    severity: "High" as const,
    significance: "Neutralized an entire browser security feature across every page — a single passthrough policy registration silently disabled DOM XSS protection for millions of Brave users.",
    narrative: "A browser ad-blocker scriptlet silently registered a default Trusted Types policy as a pure passthrough, neutralizing DOM XSS protection for every page where the scriptlet was injected. Found through differential analysis comparing how sibling scriptlets interacted with Chromium web platform security features. Built a targeted test harness in a debug Brave browser build (compiled from source) to confirm the bypass. The finding demonstrated that a well-intentioned security tool could silently undermine another security feature.",
  },
];

export const methodology = [
  {
    phase: "01",
    name: "RECONNAISSANCE",
    description: "Map the complete attack surface",
    details: [
      "Enumerate all endpoints, parameters, and data flows",
      "Identify technology stack and framework versions",
      "Discover hidden APIs, admin panels, and debug endpoints",
      "Map authentication and authorization boundaries",
    ],
  },
  {
    phase: "02",
    name: "THREAT MODELING",
    description: "Identify what matters most",
    details: [
      "Build data flow diagrams for critical paths",
      "Apply STRIDE to each trust boundary crossing",
      "Prioritize attack vectors by business impact",
      "Document assumptions and trust relationships",
    ],
  },
  {
    phase: "03",
    name: "VULNERABILITY DISCOVERY",
    description: "Find what scanners miss",
    details: [
      "Manual testing of business logic and auth flows",
      "Automated scanning with tuned configurations",
      "Code review for source-to-sink taint paths",
      "Fuzzing of API parameters and file parsers",
    ],
  },
  {
    phase: "04",
    name: "EXPLOITATION",
    description: "Prove real impact",
    details: [
      "Build working proof-of-concept exploits",
      "Chain vulnerabilities for maximum impact",
      "Document exact reproduction steps",
      "Capture evidence: screenshots, request/response pairs",
    ],
  },
  {
    phase: "05",
    name: "POST-EXPLOITATION",
    description: "Determine blast radius",
    details: [
      "Assess lateral movement possibilities",
      "Evaluate data exposure scope",
      "Test privilege escalation paths",
      "Map affected user populations",
    ],
  },
  {
    phase: "06",
    name: "REPORTING",
    description: "Deliver actionable intelligence",
    details: [
      "Write engineering-ready remediation guidance",
      "Score with CVSS and map to CWE/OWASP",
      "Include exploit narratives with full context",
      "Provide executive summary with risk ratings",
    ],
  },
  {
    phase: "07",
    name: "VERIFICATION",
    description: "Confirm the fix works",
    details: [
      "Retest all findings after remediation",
      "Verify fixes don't introduce regressions",
      "Validate defense-in-depth measures",
      "Update finding status and close the loop",
    ],
  },
];

export type PlatformMethodology = {
  id: string;
  name: string;
  icon: string;
  phases: {
    phase: string;
    name: string;
    description: string;
    details: string[];
    terminalCmds: string[];
    timeAlloc: number;
    linkedFinding?: { title: string; detail: string };
  }[];
};

export const platformMethodologies: PlatformMethodology[] = [
  {
    id: 'aws',
    name: 'AWS / CLOUD',
    icon: 'cloud',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Map cloud infrastructure and IAM boundaries',
        details: [
          'Enumerate IAM roles, policies, and trust relationships',
          'Scan S3 bucket policies and ACLs for misconfigurations',
          'Map VPC topology, security groups, and network flows',
          'Discover CloudFormation stacks and Lambda functions',
        ],
        terminalCmds: [
          'aws iam list-roles --query "Roles[].RoleName"',
          'scout suite --provider aws --regions us-east-1,us-west-2',
          'aws s3api get-bucket-policy --bucket target-assets',
          'awsporter scan --target *.target.com --tls-audit',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'CloudFormation CLI Injection', detail: 'Mapped three distinct input paths to the same shell injection sink during infrastructure recon' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Identify IAM and service trust boundaries',
        details: [
          'Map cross-account trust relationships and AssumeRole chains',
          'Apply STRIDE to each AWS service integration point',
          'Identify IMDS exposure paths on EC2/ECS workloads',
          'Document S3→Lambda→DynamoDB data flow trust assumptions',
        ],
        terminalCmds: [
          'aws iam simulate-principal-policy --policy-source-arn $ROLE',
          'mapping trust boundaries: IAM → S3 → Lambda → DynamoDB',
          'checking IMDS v1/v2 enforcement across fleet...',
          'STRIDE analysis: 14 trust boundary crossings identified',
        ],
        timeAlloc: 12,
        linkedFinding: { title: 'SDK SSRF via bucketEndpoint', detail: 'Threat model revealed IMDS as high-value target reachable through SDK misconfiguration' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Find cloud-native and SDK-level flaws',
        details: [
          'Test SDK parameter handling for injection and SSRF paths',
          'Audit IAM policy conditions and resource-based policies',
          'Review CloudFormation templates for hardcoded secrets',
          'Fuzz API Gateway endpoints and Lambda event payloads',
        ],
        terminalCmds: [
          'testing bucketEndpoint SSRF → http://169.254.169.254/latest/meta-data/',
          'aws sts get-caller-identity → AccessKeyId leaked!',
          'scanning CF templates: 3 hardcoded credentials found',
          'fuzzing Lambda event payload: unexpected deserialization path',
        ],
        timeAlloc: 28,
        linkedFinding: { title: 'SDK SSRF via bucketEndpoint', detail: 'Bucket parameter accepted as full URL with zero validation — direct path to IMDS credential theft' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Prove cloud privilege escalation and data exfiltration',
        details: [
          'Build PoC for STS credential theft via SSRF chains',
          'Demonstrate cross-account pivot through misconfigured roles',
          'Exfiltrate data through overly permissive S3 policies',
          'Chain CLI injection to container escape to host compromise',
        ],
        terminalCmds: [
          'curl http://169.254.169.254/latest/meta-data/iam/security-credentials/',
          'aws sts assume-role --role-arn arn:aws:iam::$ACCT:role/admin',
          'PoC confirmed: STS credentials exfiltrated in 3 input paths',
          'documenting reproduction steps with exact request/response pairs',
        ],
        timeAlloc: 20,
        linkedFinding: { title: 'CloudFormation CLI Injection', detail: 'json.dumps() quoting flaw → shell breakout → STS credential exfiltration via three distinct paths' },
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Assess blast radius across AWS accounts',
        details: [
          'Map lateral movement through cross-account role chains',
          'Enumerate accessible resources with stolen credentials',
          'Test privilege escalation from compromised Lambda to admin',
          'Assess data exposure scope across S3, DynamoDB, RDS',
        ],
        terminalCmds: [
          'enumerating accessible resources with exfiltrated creds...',
          'aws s3 ls → 47 buckets accessible from compromised role',
          'privilege escalation: Lambda → IAM:PassRole → Admin confirmed',
          'blast radius: 3 accounts, 47 buckets, 12 DynamoDB tables',
        ],
        timeAlloc: 10,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Deliver AWS-specific remediation guidance',
        details: [
          'Map findings to AWS Mandatory Test Cases (MTC 1–14)',
          'Score with CVSS and map to CWE/OWASP',
          'Provide IAM policy least-privilege remediation templates',
          'Include executive summary with AWS service risk heatmap',
        ],
        terminalCmds: [
          'mapping to MTC: MTC-03 (IAM), MTC-07 (S3), MTC-12 (Network)',
          'generating CVSS vectors for 12 findings...',
          'attaching IAM policy remediation templates',
          'report generated: 47 pages, executive summary included',
        ],
        timeAlloc: 10,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Retest and validate cloud-native fixes',
        details: [
          'Retest all findings after remediation deployment',
          'Verify IMDSv2 enforcement across all EC2 instances',
          'Confirm IAM policy changes follow least-privilege',
          'Validate S3 bucket policies deny public access',
        ],
        terminalCmds: [
          'retesting SSRF: IMDSv2 now enforced ✓',
          'IAM policy review: least-privilege confirmed ✓',
          'S3 public access block: enabled on all buckets ✓',
          'all 12 findings verified as remediated',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'web',
    name: 'WEB / API',
    icon: 'web',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Map the complete web attack surface',
        details: [
          'Enumerate all endpoints, parameters, and data flows',
          'Identify technology stack and framework versions',
          'Discover hidden APIs, admin panels, and debug endpoints',
          'Map authentication and authorization boundaries',
        ],
        terminalCmds: [
          'burp spider → 847 unique endpoints discovered',
          'wappalyzer: Rails 7.1, React 18, PostgreSQL',
          'dirsearch -u https://target.com -w api-wordlist.txt',
          'mapping auth flows: OAuth2, session cookies, API keys',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'postMessage XSS → ATO', detail: 'Endpoint mapping revealed permissive postMessage listener accepting cross-origin messages' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Identify business logic trust boundaries',
        details: [
          'Build data flow diagrams for critical auth/payment paths',
          'Apply STRIDE to each trust boundary crossing',
          'Prioritize attack vectors by business impact',
          'Document session management and CSRF protection assumptions',
        ],
        terminalCmds: [
          'DFD: user input → postMessage → CSRF token → profile update',
          'STRIDE: spoofing on postMessage (no origin check)',
          'trust boundary: client-side validation only on payment flow',
          'CSRF protection: token-based but token retrievable via GET',
        ],
        timeAlloc: 12,
        linkedFinding: { title: 'Prototype Pollution', detail: 'STRIDE identified untrusted JSON input crossing trust boundary into deep merge operation' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Find what scanners miss',
        details: [
          'Manual testing of business logic and auth flows',
          'Source-to-sink taint analysis for XSS and injection',
          'Deep merge and prototype pollution pattern hunting',
          'IDOR and horizontal privilege escalation testing',
        ],
        terminalCmds: [
          'testing postMessage handler: origin not validated!',
          'tracing taint: user input → json.parse → __proto__ → shared state',
          'IDOR test: changing user_id=1 to user_id=2 → unauthorized access',
          'prototype pollution: __proto__.isAdmin = true → privilege escalation',
        ],
        timeAlloc: 30,
        linkedFinding: { title: 'postMessage XSS → ATO', detail: 'Manual code review found permissive postMessage listener no scanner flagged' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Build multi-step exploit chains',
        details: [
          'Chain XSS → CSRF → ATO for maximum impact',
          'Build working proof-of-concept exploits',
          'Document exact reproduction steps with request/response',
          'Demonstrate impact on real user sessions',
        ],
        terminalCmds: [
          'step 1: postMessage XSS delivers payload to permissive listener',
          'step 2: payload harvests CSRF token via GET endpoint',
          'step 3: secondary XSS fires profile update with stolen token',
          'result: complete account takeover — zero user interaction',
        ],
        timeAlloc: 18,
        linkedFinding: { title: 'postMessage XSS → ATO', detail: '4-step invisible chain: each link harmless alone, devastating together' },
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Determine user impact scope',
        details: [
          'Assess lateral movement through session hijacking',
          'Evaluate data exposure scope across user base',
          'Test privilege escalation from user to admin',
          'Map affected user populations and data types',
        ],
        terminalCmds: [
          'session hijack: admin session accessible via same chain',
          'data exposure: PII of all users in affected workflow',
          'privilege escalation: user → admin via prototype pollution',
          'affected population: ~50,000 active users',
        ],
        timeAlloc: 8,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Deliver engineering-ready remediation',
        details: [
          'Write remediation with exact code fix locations',
          'Score with CVSS and map to CWE/OWASP Top 10',
          'Include exploit chain narrative with full context',
          'Provide executive summary with risk ratings',
        ],
        terminalCmds: [
          'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:N → 9.3',
          'CWE-79 (XSS) chained with CWE-352 (CSRF)',
          'remediation: validate postMessage origin + HttpOnly cookies',
          'report delivered: 3 critical, 2 high, 4 medium',
        ],
        timeAlloc: 12,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Confirm fixes hold under attack',
        details: [
          'Retest all findings after remediation',
          'Verify XSS fixes with mutation testing',
          'Confirm CSRF protection across all state-changing endpoints',
          'Validate defense-in-depth: CSP, SameSite, HttpOnly',
        ],
        terminalCmds: [
          'postMessage: origin validation enforced ✓',
          'CSRF: SameSite=Strict + token validation ✓',
          'CSP: script-src self with nonce ✓',
          'all findings verified as remediated ✓',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'mobile',
    name: 'MOBILE',
    icon: 'mobile',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Decompile and map the mobile app surface',
        details: [
          'APK/IPA extraction and decompilation with jadx/apktool',
          'Scan for hardcoded credentials and API keys in assets',
          'Map network endpoints from decompiled source',
          'Identify certificate pinning and root detection mechanisms',
        ],
        terminalCmds: [
          'apktool d target.apk -o decompiled/',
          'jadx -d src/ target.apk && grep -r "API_KEY" src/',
          'found: airshipconfig.properties with production keys!',
          'SSL pinning: OkHttp CertificatePinner detected',
        ],
        timeAlloc: 18,
        linkedFinding: { title: 'DIBZ Hardcoded Credentials', detail: 'APK decompilation revealed production Urban Airship keys in plaintext assets' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Map mobile-specific trust boundaries',
        details: [
          'Identify IPC attack surface: intents, content providers, broadcasts',
          'Map local storage: SharedPreferences, SQLite, Keystore usage',
          'Assess environment separation (dev vs prod credentials)',
          'Document third-party SDK trust assumptions',
        ],
        terminalCmds: [
          'AndroidManifest: 4 exported activities, 2 content providers',
          'SharedPreferences: auth tokens stored in plaintext',
          'environment check: dev and prod credentials IDENTICAL',
          'third-party SDKs: Facebook, GCP, Urban Airship — all hardcoded',
        ],
        timeAlloc: 10,
        linkedFinding: { title: 'DIBZ Hardcoded Credentials', detail: 'No environment separation — development and production credentials identical' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Runtime analysis and hooking',
        details: [
          'Bypass SSL pinning with Frida/Objection for traffic interception',
          'Hook runtime methods to understand authentication flow',
          'Test deep link handlers for injection and redirect flaws',
          'Analyze local database and file storage for sensitive data',
        ],
        terminalCmds: [
          'frida -U -f com.flutter.dibz -l ssl_bypass.js --no-pause',
          'objection explore → android sslpinning disable',
          'intercepting API traffic: auth tokens in headers',
          'MobSF static scan: 12 high, 8 medium findings',
        ],
        timeAlloc: 28,
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Demonstrate real-world mobile attack impact',
        details: [
          'Weaponize hardcoded push notification credentials',
          'Demonstrate mass phishing via push notification API',
          'Extract and replay authentication tokens',
          'Build PoC for intent hijacking and data exfiltration',
        ],
        terminalCmds: [
          'curl -X POST urbanairship.com/api/push -d \'{"audience":"all"}\'',
          'PoC: push notification sent to ALL users with phishing payload',
          'for a real-money gambling app → direct financial fraud vector',
          'additional: Facebook token, GCP key also exploitable',
        ],
        timeAlloc: 20,
        linkedFinding: { title: 'DIBZ Hardcoded Credentials', detail: 'Production push notification keys enabled phishing every user with one API call' },
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Assess platform-wide impact',
        details: [
          'Map reachable internal infrastructure from leaked hostnames',
          'Test credential reuse across Flutter Entertainment properties',
          'Enumerate user base exposure through push notification API',
          'Assess financial fraud potential on gambling platform',
        ],
        terminalCmds: [
          'internal hostnames: live DNS resolution confirmed',
          'GCP API key: valid across multiple services',
          'push notification reach: entire user base of DIBZ app',
          'blast radius: Betfair, Paddy Power, Sky Bet ecosystem',
        ],
        timeAlloc: 8,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Deliver mobile-specific remediation',
        details: [
          'Recommend environment-separated credential management',
          'Prescribe Android Keystore for secret storage',
          'Map to OWASP Mobile Top 10 (M1, M2, M9)',
          'Include HackerOne report with full PoC',
        ],
        terminalCmds: [
          'CVSS: 9.1 Critical — hardcoded production credentials',
          'OWASP Mobile: M1 (Improper Platform Usage), M9 (Reverse Engineering)',
          'remediation: environment config + Keystore + certificate rotation',
          'HackerOne report submitted with full reproduction steps',
        ],
        timeAlloc: 11,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Confirm secrets rotated and removed',
        details: [
          'Verify all hardcoded credentials removed from APK',
          'Confirm environment separation in new build',
          'Validate certificate pinning re-enabled correctly',
          'Check push notification keys rotated',
        ],
        terminalCmds: [
          'new APK decompiled: no hardcoded credentials found ✓',
          'environment config: separate dev/staging/prod ✓',
          'Urban Airship keys: rotated and environment-specific ✓',
          'all findings verified as remediated ✓',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'bounty',
    name: 'BUG BOUNTY',
    icon: 'bounty',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Scope analysis and asset discovery',
        details: [
          'Analyze program scope, rules of engagement, and exclusions',
          'Subdomain enumeration and asset fingerprinting',
          'Monitor changelog/releases for new attack surface',
          'Study previous disclosed reports for pattern insights',
        ],
        terminalCmds: [
          'scope: *.target.com — excluding staging.target.com',
          'subfinder -d target.com | httpx -status-code -tech-detect',
          'monitoring: new webhook endpoint added in v4.2.1',
          'previous reports: 2 XSS, 1 IDOR — webhook flow untested',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'WPForms Webhook Forgery', detail: 'Scope analysis revealed webhook handler as new untested attack surface' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Differential analysis of sibling handlers',
        details: [
          'Compare security implementations across similar features',
          'Identify inconsistent validation between payment handlers',
          'Map webhook/callback trust assumptions',
          'Analyze plugin architecture for shared vulnerability patterns',
        ],
        terminalCmds: [
          'diff analysis: Stripe handler uses constructEvent() for sig verify',
          'diff analysis: Square handler uses webhook signature check',
          'diff analysis: PayPal handler — NO signature verification!',
          'pattern: 2/3 handlers verify, 1/3 trusts raw input blindly',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'WPForms Webhook Forgery', detail: 'Differential analysis: sibling Stripe/Square handlers verify signatures, PayPal does not' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Target high-value logic flaws',
        details: [
          'Test webhook handlers for signature forgery/bypass',
          'Hunt for TOCTOU and race conditions in payment flows',
          'Analyze plugin update mechanisms for supply chain risks',
          'Test CSP and security header implementations',
        ],
        terminalCmds: [
          'testing PayPal webhook: json_decode(file_get_contents("php://input"))',
          'no HMAC, no signature, no nonce — raw JSON accepted',
          'forged webhook: {"event":"PAYMENT.CAPTURE.COMPLETED"}',
          'result: pending payment marked as completed!',
        ],
        timeAlloc: 30,
        linkedFinding: { title: 'WPForms Webhook Forgery', detail: '6M+ WordPress installations accepted forged payment notifications with zero verification' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Build weaponized PoC for maximum impact',
        details: [
          'Craft forged webhook payloads for payment manipulation',
          'Demonstrate subscription cancellation via forged events',
          'Build automated exploitation script for scale impact',
          'Document affected population (6M+ installations)',
        ],
        terminalCmds: [
          'curl -X POST target.com/wpforms/webhook/paypal -d \'{"event_type":"PAYMENT.CAPTURE.COMPLETED"}\'',
          'HTTP 200 — payment status updated to "completed"',
          'curl ... -d \'{"event_type":"BILLING.SUBSCRIPTION.CANCELLED"}\'',
          'HTTP 200 — active subscription cancelled',
        ],
        timeAlloc: 18,
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Assess ecosystem-wide impact',
        details: [
          'Estimate affected installation base from WordPress stats',
          'Test if attack works across different hosting environments',
          'Assess financial impact potential across all installations',
          'Verify no rate limiting on webhook endpoint',
        ],
        terminalCmds: [
          'wordpress.org stats: 6,000,000+ active installations',
          'tested on: shared hosting, VPS, managed WP — all vulnerable',
          'no rate limiting on webhook endpoint',
          'impact: mass payment fraud across entire WPForms ecosystem',
        ],
        timeAlloc: 5,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Submit through responsible disclosure',
        details: [
          'Write Wordfence bug bounty report with full PoC',
          'Include diff showing secure vs insecure handler code',
          'Recommend constructEvent() pattern from sibling handlers',
          'Score impact: CVSS 8.2 High, CWE-345',
        ],
        terminalCmds: [
          'Wordfence report submitted: WPForms PayPal webhook forgery',
          'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:L → 8.2',
          'CWE-345: Insufficient Verification of Data Authenticity',
          'remediation: implement webhook_verify() like Stripe handler',
        ],
        timeAlloc: 12,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Confirm patch deployed to ecosystem',
        details: [
          'Verify signature verification added to PayPal handler',
          'Test forged webhook rejected with proper error',
          'Confirm WordPress auto-update pushed fix to installations',
          'Retest edge cases: replay attacks, timing attacks',
        ],
        terminalCmds: [
          'forged webhook: HTTP 403 — invalid signature ✓',
          'replay test: nonce validation prevents replay ✓',
          'WordPress auto-update: patch in WPForms v1.8.x ✓',
          'all findings verified as remediated ✓',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'browser',
    name: 'BROWSER',
    icon: 'browser',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Build from source and map browser internals',
        details: [
          'Compile debug browser build from source (Brave/Chromium)',
          'Map injected scriptlets and content scripts',
          'Identify web platform security feature touchpoints',
          'Enumerate Trusted Types, CSP, and sandboxing configurations',
        ],
        terminalCmds: [
          'git clone https://github.com/nickcalabs/nickcalabs-nickcala-nickcalabs-nickcala-nickcalabs-nickcala && gclient sync',
          'autoninja -C out/Debug brave',
          'mapping injected scriptlets: 47 content scripts found',
          'security features: Trusted Types, CSP, COEP, COOP',
        ],
        timeAlloc: 20,
        linkedFinding: { title: 'Trusted Types CSP Bypass', detail: 'Source build revealed scriptlet injection pipeline and Trusted Types policy registration' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Analyze security feature interactions',
        details: [
          'Map how browser extensions interact with web platform security',
          'Identify where scriptlets can modify security policies',
          'Analyze Trusted Types default policy registration flow',
          'Document trust assumptions between ad-blocker and page security',
        ],
        terminalCmds: [
          'threat: scriptlet registers Trusted Types default policy',
          'default policy = passthrough → ALL DOM XSS protection disabled',
          'interaction: ad-blocker security tool undermines browser security',
          'scope: every page where ad-blocking scriptlet is injected',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'Trusted Types CSP Bypass', detail: 'Differential analysis of sibling scriptlets revealed inconsistent security feature handling' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Differential testing of browser security features',
        details: [
          'Compare scriptlet behavior across different browser features',
          'Build targeted test harness in debug build',
          'Fuzz DOM API interactions with Trusted Types policies',
          'Test edge cases in policy registration and enforcement',
        ],
        terminalCmds: [
          'test harness: page with Trusted Types enforcement header',
          'injecting scriptlet → default policy registered as passthrough',
          'innerHTML = "<img onerror=alert(1)>" → EXECUTES (should be blocked)',
          'confirmed: Trusted Types DOM XSS protection fully neutralized',
        ],
        timeAlloc: 25,
        linkedFinding: { title: 'Trusted Types CSP Bypass', detail: 'Passthrough policy silently disabled DOM XSS protection for millions of Brave users' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Demonstrate security feature neutralization',
        details: [
          'Build PoC showing DOM XSS succeeding despite Trusted Types',
          'Demonstrate attack works on any page with the scriptlet',
          'Quantify affected user base (all Brave users with ad-blocking)',
          'Document the irony: security tool disables security feature',
        ],
        terminalCmds: [
          'PoC: Trusted Types enforced → scriptlet injected → policy bypassed',
          'document.body.innerHTML = malicious_html → executed successfully',
          'affected: all Brave users with default ad-blocking enabled',
          'impact: entire Trusted Types security feature neutralized',
        ],
        timeAlloc: 18,
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Assess browser-wide security regression',
        details: [
          'Test if bypass affects other Chromium security features',
          'Assess whether other browsers with similar scriptlets are affected',
          'Map all websites relying on Trusted Types for XSS protection',
          'Evaluate supply chain risk: scriptlet update could weaponize',
        ],
        terminalCmds: [
          'COEP/COOP: not affected by this specific bypass',
          'other browsers: testing uBlock Origin equivalent scriptlets',
          'Trusted Types adoption: GitHub, Google properties, major banks',
          'supply chain risk: scriptlet auto-updates from filter lists',
        ],
        timeAlloc: 7,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Submit to browser vendor VDP',
        details: [
          'Write Brave VDP report with debug build reproduction steps',
          'Include differential analysis showing correct vs incorrect behavior',
          'Recommend scoped policy registration instead of passthrough',
          'Attach test harness for vendor verification',
        ],
        terminalCmds: [
          'Brave VDP report submitted: Trusted Types CSP Bypass',
          'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:N/I:H/A:N → 7.5',
          'remediation: register scoped policy with actual sanitization',
          'test harness attached for reproduction',
        ],
        timeAlloc: 10,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Confirm browser security restored',
        details: [
          'Verify scriptlet no longer registers passthrough policy',
          'Test Trusted Types enforcement works with updated scriptlet',
          'Confirm DOM XSS protection restored for all pages',
          'Validate fix pushed through filter list update mechanism',
        ],
        terminalCmds: [
          'updated scriptlet: scoped policy with sanitization ✓',
          'Trusted Types: DOM XSS blocked as expected ✓',
          'filter list update: deployed to all Brave users ✓',
          'all findings verified as remediated ✓',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'blockchain',
    name: 'BLOCKCHAIN',
    icon: 'chain',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Analyze consensus protocol and P2P network',
        details: [
          'Study consensus mechanism documentation and source code',
          'Map P2P network topology and message types',
          'Identify validator nodes and their trust assumptions',
          'Enumerate API endpoints and RPC interfaces',
        ],
        terminalCmds: [
          'git clone https://github.com/tronprotocol/java-tron',
          'analyzing PBFT consensus implementation...',
          'P2P message types: 23 unique message handlers found',
          'validator trust: signature quorum required for finality',
        ],
        timeAlloc: 18,
        linkedFinding: { title: 'Tron PBFT Bypass', detail: 'Source code review revealed PBFT consensus validation flow and signature verification logic' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Map consensus trust boundaries',
        details: [
          'Identify where consensus validation occurs in the pipeline',
          'Map trust assumptions between validators and peers',
          'Analyze signature verification and quorum logic',
          'Document edge cases: empty inputs, partial signatures, replays',
        ],
        terminalCmds: [
          'trust boundary: P2P message → validPbftSign() → finality update',
          'quorum logic: requires 2/3 validator signatures',
          'edge case identified: what if signature list is EMPTY?',
          'hypothesis: empty list may bypass quorum check entirely',
        ],
        timeAlloc: 15,
        linkedFinding: { title: 'Tron PBFT Bypass', detail: 'Edge case analysis: empty signature list as input to quorum verification' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Audit consensus validation logic',
        details: [
          'Code review of validPbftSign() implementation',
          'Test behavior with empty, malformed, and forged signature lists',
          'Analyze all code paths through the verification function',
          'Identify unconditional return values on edge cases',
        ],
        terminalCmds: [
          'validPbftSign(emptyList) → returns TRUE unconditionally',
          'no signatures checked → quorum verification SKIPPED',
          'forged solidification data injectable without any signatures',
          'zero privileges required — only TCP connection to P2P port',
        ],
        timeAlloc: 28,
        linkedFinding: { title: 'Tron PBFT Bypass', detail: 'validPbftSign() returned true on empty signature list — bypassing entire consensus mechanism' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Demonstrate consensus mechanism bypass',
        details: [
          'Build PoC injecting forged finality data via P2P protocol',
          'Demonstrate blockchain finality can be manipulated',
          'Prove attack requires zero authentication or privileges',
          'Document impact on transaction finality guarantees',
        ],
        terminalCmds: [
          'connecting to P2P port via raw TCP...',
          'sending PBFT message with empty signature list...',
          'forged solidification data ACCEPTED by target node',
          'blockchain finality guarantee: COMPROMISED',
        ],
        timeAlloc: 18,
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Assess blockchain-wide impact',
        details: [
          'Evaluate impact on transaction finality for all users',
          'Test if attack propagates across the validator network',
          'Assess potential for double-spend exploitation',
          'Map financial exposure across Tron ecosystem',
        ],
        terminalCmds: [
          'finality attack: affects all nodes trusting solidification data',
          'propagation: forged data relayed to connected peers',
          'double-spend potential: theoretical via finality manipulation',
          'Tron market cap exposure: billions in transaction value',
        ],
        timeAlloc: 6,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Submit through HackerOne',
        details: [
          'Write HackerOne report with exact code path and PoC',
          'Include source code analysis of validPbftSign()',
          'Recommend: reject empty signature lists before quorum check',
          'Score: CVSS 8.6 High — unauthenticated consensus bypass',
        ],
        terminalCmds: [
          'HackerOne report submitted: Tron PBFT consensus bypass',
          'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:N/I:H/A:L → 8.6',
          'CWE-287: Improper Authentication',
          'remediation: validate signature count > 0 before verification',
        ],
        timeAlloc: 10,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Confirm consensus integrity restored',
        details: [
          'Verify empty signature list now rejected with error',
          'Test minimum quorum enforcement on all PBFT messages',
          'Confirm fix deployed across validator network',
          'Retest: forged solidification data rejected',
        ],
        terminalCmds: [
          'empty signatures: rejected with InvalidSignatureCount ✓',
          'minimum quorum: enforced at 2/3 validator threshold ✓',
          'forged PBFT message: rejected at validation layer ✓',
          'all findings verified as remediated ✓',
        ],
        timeAlloc: 5,
      },
    ],
  },
  {
    id: 'codereview',
    name: 'CODE REVIEW',
    icon: 'code',
    phases: [
      {
        phase: '01', name: 'RECONNAISSANCE', description: 'Map the codebase architecture and data flows',
        details: [
          'Identify language, frameworks, and dependency versions',
          'Map entry points: routes, controllers, API handlers',
          'Trace authentication and authorization middleware chains',
          'Enumerate third-party libraries and known CVE exposure',
        ],
        terminalCmds: [
          'semgrep --config=auto --metrics=off ./src/',
          'dependency audit: 847 packages, 12 known CVEs',
          'entry points mapped: 94 routes, 23 API handlers',
          'auth chain: JWT → middleware → role check → handler',
        ],
        timeAlloc: 12,
        linkedFinding: { title: 'Prototype Pollution', detail: 'Dependency tree analysis identified deep merge operation on user-controlled JSON input' },
      },
      {
        phase: '02', name: 'THREAT MODELING', description: 'Identify dangerous source-to-sink paths',
        details: [
          'Map taint sources: user input, request params, file uploads',
          'Identify dangerous sinks: eval, innerHTML, SQL queries, shell exec',
          'Trace data flow from source to sink through transforms',
          'Document sanitization gaps and missing validation',
        ],
        terminalCmds: [
          'taint sources: req.body, req.params, req.query, file uploads',
          'sinks: json.dumps() → shell, innerHTML, pg.query()',
          'tracing: req.body → JSON.parse → deepMerge → __proto__',
          'gap: no prototype pollution guard on merge operation',
        ],
        timeAlloc: 18,
        linkedFinding: { title: 'postMessage XSS → ATO', detail: 'Source-to-sink trace revealed postMessage data flowing unvalidated to DOM manipulation' },
      },
      {
        phase: '03', name: 'VULNERABILITY DISCOVERY', description: 'Pattern-match and taint-trace manually',
        details: [
          'CodeQL and Semgrep custom rules for framework-specific patterns',
          'Manual grep for dangerous patterns: eval, exec, innerHTML, merge',
          'Differential review: compare secure vs insecure handler implementations',
          'Trace authentication bypass paths through middleware ordering',
        ],
        terminalCmds: [
          'codeql query: "taint from request to shell exec"',
          'semgrep --config custom-rules/prototype-pollution.yml',
          'grep -rn "deepMerge\\|Object.assign\\|_.merge" src/',
          'FOUND: unguarded deep merge at src/utils/config.js:47',
        ],
        timeAlloc: 30,
        linkedFinding: { title: 'Prototype Pollution', detail: 'Custom Semgrep rule matched deep merge on user-controlled input — manual trace confirmed exploitability' },
      },
      {
        phase: '04', name: 'EXPLOITATION', description: 'Build PoC from source code understanding',
        details: [
          'Construct payloads targeting exact code paths identified',
          'Chain multiple source-to-sink paths for compound impact',
          'Build exploit that demonstrates real-world impact, not just theory',
          'Document exact file, line number, and function for each flaw',
        ],
        terminalCmds: [
          'payload: {"__proto__":{"isAdmin":true}} → deepMerge()',
          'prototype chain polluted: all subsequent Object instances affected',
          'impact: application-wide privilege escalation across all sessions',
          'root cause: src/utils/config.js:47 → no __proto__ sanitization',
        ],
        timeAlloc: 18,
        linkedFinding: { title: 'Prototype Pollution', detail: 'Single polluted key compromised application-wide state across every user session simultaneously' },
      },
      {
        phase: '05', name: 'POST-EXPLOITATION', description: 'Trace impact through the codebase',
        details: [
          'Map all code paths affected by the vulnerability',
          'Identify shared state and cross-session contamination',
          'Search for identical patterns elsewhere in the codebase',
          'Assess if the vulnerability class affects other services',
        ],
        terminalCmds: [
          'grep for same pattern: 3 additional deepMerge calls found',
          'shared state: prototype pollution affects global Object',
          'cross-session: Node.js single-threaded → all users impacted',
          'additional services: API gateway uses same utility library',
        ],
        timeAlloc: 8,
      },
      {
        phase: '06', name: 'REPORTING', description: 'Deliver code-level remediation guidance',
        details: [
          'Pin findings to exact file, line, and function',
          'Provide before/after code snippets for each fix',
          'Include CodeQL/Semgrep rules to prevent regression',
          'Map to CWE and recommend secure coding standards',
        ],
        terminalCmds: [
          'finding: src/utils/config.js:47 — unguarded deepMerge()',
          'fix: add Object.keys filter for __proto__, constructor, prototype',
          'regression rule: semgrep rule committed to CI pipeline',
          'CWE-1321: Improperly Controlled Modification of Object Prototype',
        ],
        timeAlloc: 10,
      },
      {
        phase: '07', name: 'VERIFICATION', description: 'Verify fix and add CI guardrails',
        details: [
          'Verify prototype pollution payload rejected after fix',
          'Run custom Semgrep/CodeQL rules against patched codebase',
          'Confirm CI pipeline blocks future vulnerable patterns',
          'Retest all identified merge operations across codebase',
        ],
        terminalCmds: [
          '__proto__ payload: rejected with sanitization error ✓',
          'semgrep CI scan: 0 findings on patched codebase ✓',
          'CI guardrail: custom rule added to pre-commit hooks ✓',
          'all 4 deepMerge call sites verified as remediated ✓',
        ],
        timeAlloc: 4,
      },
    ],
  },
];

export const projects = [
  {
    id: "FER-001",
    name: "AWSPorter",
    tech: "Python",
    status: "DEPLOYED",
    description: "Automated endpoint discovery, TLS configuration analysis, and attack surface reporting for AWS assessments. Reduces reconnaissance time on every engagement.",
    tags: ["Python", "AWS", "Automation", "TLS", "Recon"],
  },
  {
    id: "FER-002",
    name: "System Call Telemetry",
    tech: "Python / Linux",
    status: "DEPLOYED",
    description: "Kernel-level monitoring with 21 syscall hooks for real-time anomaly detection. Captures process behavior patterns for threat hunting and incident response.",
    tags: ["Python", "Linux", "eBPF", "Syscalls", "Detection"],
  },
  {
    id: "FER-003",
    name: "Binary Exploitation Lab",
    tech: "Ghidra / pwntools",
    status: "RESEARCH",
    description: "Georgia Tech coursework in reverse engineering, binary exploitation, and vulnerability research. Covers stack/heap overflow, ROP chains, and format string attacks.",
    tags: ["Ghidra", "pwntools", "ROP", "Heap", "RE"],
  },
  {
    id: "FER-004",
    name: "Honeypot+",
    tech: "Python / Snort",
    status: "PROTOTYPE",
    description: "Network deception framework with 30 service emulations for threat intelligence collection. Captures attacker TTPs and generates IOCs automatically.",
    tags: ["Python", "Snort", "Honeypot", "Deception", "Intel"],
  },
];

export const arsenal = {
  "Security Testing": ["Burp Suite Pro", "OWASP ZAP", "Nmap", "Metasploit", "BloodHound", "Wireshark", "OpenSSL", "testssl.sh", "PromptFoo"],
  "SAST & Code Analysis": ["Semgrep", "CodeQL", "Veracode", "Custom Python Fuzzers"],
  "Cloud & Infrastructure": ["ScoutSuite", "Meteo", "AWSPorter (Custom)", "Trivy", "Grype", "Docker", "Kubernetes"],
  "Mobile Security": ["Frida", "Objection", "MobSF", "apktool", "jadx", "ADB", "Drozer", "Xposed Framework", "iOS SSL Kill Switch"],
  "Reverse Engineering": ["Ghidra", "pwntools", "Snort"],
  "Burp Extensions": ["HTTP Request Smuggler", "Param Miner", "Active Scan++", "Turbo Intruder", "Backslash Powered Scanner", "Server-Side Prototype Pollution Scanner", "Diff Scans / Distribute Damage"],
  "Languages": ["Python", "JavaScript / TypeScript", "Java", "PHP", "C", "C++", ".NET (C#)", "Rust", "Ruby", "Go", "Bash"],
  "Standards & Frameworks": ["OWASP Top 10", "OWASP Top 10 for LLMs", "CWE", "CVSS", "MITRE ATT&CK", "MITRE ATLAS", "AWS Security Best Practices", "AWS Mandatory Test Cases (MTC 1–14)", "STRIDE"],
  "Platforms": ["HackerOne", "Wordfence Bug Bounty", "Bugcrowd"],
};

export const sectionNames = [
  "COVER",
  "BRIEFING",
  "BUREAU VERITAS",
  "ARCHIVES",
  "CAPABILITIES",
  "TRANSCRIPT",
  "CREDENTIALS",
  "EVIDENCE",
  "HALL OF FAME",
  "METHODOLOGY",
  "PROJECTS",
  "ARSENAL",
  "CONTACT",
];
