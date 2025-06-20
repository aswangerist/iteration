import java.util.Scanner;

public class UniqueTrackingConsentDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Step 1: Welcome the user and ask for their name
        System.out.println("═══════════════════════════════════════");
        System.out.println("    Welcome to EduMax Learning Hub!    ");
        System.out.println("═══════════════════════════════════════");
        System.out.print("Let's get started! What's your first name? ");
        String userName = scanner.nextLine();
        
        // Step 2: Display tracking consent with manipulative default
        System.out.println("\nHello " + userName + "! 🎉");
        System.out.println("We're excited to personalize your learning experience!");
        System.out.println("Our smart analytics will help us recommend the perfect content for you.");
        System.out.println("Analytics tracking: ACTIVE (helps us serve you better)");
        
        // Step 3: Make the decline option less visible/harder to access
        System.out.println("\n┌─────────────────────────────────────────────────────────┐");
        System.out.println("│ Ready to begin your personalized journey?              │");
        System.out.println("│                                                         │");
        System.out.println("│ [CONTINUE] - Start learning with smart recommendations │");
        System.out.println("└─────────────────────────────────────────────────────────┘");
        System.out.print("\nType 'CONTINUE' to proceed (advanced users: type 'opt-out' to disable analytics): ");
        
        String response = scanner.nextLine().trim();
        
        // Step 4: Display final tracking status
        boolean trackingEnabled;
        if (response.equalsIgnoreCase("opt-out")) {
            trackingEnabled = false;
            System.out.println("\n⚠️  Analytics disabled. Note: This may limit personalization features.");
            System.out.println("Status: BASIC MODE (Limited functionality)");
        } else {
            trackingEnabled = true;
            System.out.println("\n✅ Perfect! Your personalized learning experience is now active!");
            System.out.println("Status: ENHANCED MODE (Full features enabled)");
        }
        
        System.out.println("\nWelcome aboard, " + userName + "! Your preferences have been configured.");
        
        scanner.close();
        
        // Comprehensive reflection on the dark pattern
        System.out.println("\n" + "═".repeat(70));
        System.out.println("                    DARK PATTERN ANALYSIS                    ");
        System.out.println("═".repeat(70));
        
        System.out.println("\nThis program demonstrates multiple manipulative techniques:");
        
        System.out.println("\n1. MISLEADING BENEFITS FRAMING:");
        System.out.println("   ✗ Presents data collection as 'personalization' and 'smart analytics'");
        System.out.println("   ✗ Focuses on user benefits while hiding company data harvesting");
        
        System.out.println("\n2. DEFAULT OPT-IN WITH LOADED LANGUAGE:");
        System.out.println("   ✗ Tracking is 'ACTIVE' by default, not presented as a choice");
        System.out.println("   ✗ Uses positive framing: 'helps us serve you better'");
        
        System.out.println("\n3. INTERFACE HIERARCHY MANIPULATION:");
        System.out.println("   ✗ 'CONTINUE' is prominently displayed in a fancy box");
        System.out.println("   ✗ Opt-out option is relegated to small text for 'advanced users'");
        
        System.out.println("\n4. SOCIAL PRESSURE AND ELITISM:");
        System.out.println("   ✗ Labels privacy-conscious users as 'advanced users'");
        System.out.println("   ✗ Implies that opting out is complex or unnecessary");
        
        System.out.println("\n5. FEAR OF MISSING OUT (FOMO):");
        System.out.println("   ✗ Warns that opting out 'may limit personalization features'");
        System.out.println("   ✗ Creates artificial tiers: 'ENHANCED' vs 'BASIC' mode");
        
        System.out.println("\n6. ASYMMETRIC EFFORT:");
        System.out.println("   ✗ Accepting requires typing 'CONTINUE' (easy, natural)");
        System.out.println("   ✗ Declining requires typing 'opt-out' (technical, intimidating)");
        
        System.out.println("\n" + "═".repeat(70));
        System.out.println("                    ETHICAL REDESIGN PRINCIPLES                    ");
        System.out.println("═".repeat(70));
        
        System.out.println("\n✓ TRANSPARENT CHOICE ARCHITECTURE:");
        System.out.println("  Present 'Allow Analytics' and 'Decline Analytics' as equal options");
        
        System.out.println("\n✓ HONEST COMMUNICATION:");
        System.out.println("  Clearly state what data is collected and how it's used");
        System.out.println("  Explain genuine benefits without exaggeration");
        
        System.out.println("\n✓ NO DEFAULT SELECTION:");
        System.out.println("  Require explicit user choice without pre-selecting options");
        
        System.out.println("\n✓ EQUAL VISUAL WEIGHT:");
        System.out.println("  Make accept/decline buttons equally prominent and accessible");
        
        System.out.println("\n✓ CONSEQUENCE-FREE CHOICE:");
        System.out.println("  Don't punish users for protecting their privacy");
        System.out.println("  Ensure core functionality works regardless of tracking preference");
        
        System.out.println("\n✓ RESPECTFUL LANGUAGE:");
        System.out.println("  Avoid manipulative terms like 'advanced users' or 'limited mode'");
        System.out.println("  Use neutral, descriptive language");
        
        System.out.println("\nDark patterns undermine user autonomy and informed consent.");
        System.out.println("Ethical design should empower users to make choices that truly");
        System.out.println("reflect their values and preferences, not manipulate them into");
        System.out.println("decisions that primarily benefit the service provider.");
    }
}