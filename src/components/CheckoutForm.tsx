import { Button } from "@/components/ui/button";
import { NotificationService } from "@/services/NotificationService";

export function CheckoutForm() {
  const testEdgeFunction = async () => {
    try {
      await NotificationService.testEdgeFunction();
    } catch (error) {
      console.error("Error testing Edge Function:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mt-8 pt-8 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={testEdgeFunction}
          className="w-full"
        >
          Test Edge Function
        </Button>
      </div>
    </div>
  );
} 