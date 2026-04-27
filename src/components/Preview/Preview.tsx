import { PaymentCard } from "./cards/PaymentCard";
import { TeamCard } from "./cards/TeamCard";
import { SettingsCard } from "./cards/SettingsCard";
import { ChatCard } from "./cards/ChatCard";
import { StatsCard } from "./cards/StatsCard";
import { NavigationCard } from "./cards/NavigationCard";
import { FormControlsCard } from "./cards/FormControlsCard";
import { FeedbackCard } from "./cards/FeedbackCard";
import "./Preview.css";

export function Preview() {
  return (
    <div className="preview">
      <div className="preview__grid">
        <PaymentCard />
        <TeamCard />
        <SettingsCard />
        <ChatCard />
        <StatsCard />
        <NavigationCard />
        <FormControlsCard />
        <FeedbackCard />
      </div>
    </div>
  );
}
