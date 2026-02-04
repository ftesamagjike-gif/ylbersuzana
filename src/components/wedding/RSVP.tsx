import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RSVP = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    familyName: "",
    attending: "",
    guestCount: "1",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Numri i personave duhet të jetë më i madh se 0
    if (formData.attending === "yes") {
      const num = Number(formData.guestCount);
      if (!Number.isInteger(num) || num < 1) {
        toast({
          title: "Vlerë e pavlefshme",
          description: "Numri i personave duhet të jetë më i madh se 0.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Import dynamically to avoid issues
      const { sendRSVPEmail } = await import("@/lib/brevo");
      
      await sendRSVPEmail(formData);

      setIsSubmitted(true);
      toast({
        title: "Faleminderit! 🎉",
        description:
          formData.attending === "yes"
            ? "Konfirmimi juaj është pranuar. Presim me padurim të takohemi!"
            : "Faleminderit që na informuat. Do të na mungoni!",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          familyName: "",
          attending: "",
          guestCount: "1",
        });
        setIsSubmitted(false);
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ndodhi një problem. Ju lutemi provoni përsëri.";
      console.error("RSVP error:", error);
      toast({
        title: "Gabim",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-ivory via-champagne/20 to-ivory">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Konfirmo Ardhjen
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Ju lutemi konfirmoni pranimin tuaj deri më 15 Korrik 2026
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-soft" />
            <Heart className="w-5 h-5 text-gold fill-gold" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-soft" />
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-gold-soft/30 shadow-2xl bg-card/95 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-serif">
                Formulari i Konfirmimit
              </CardTitle>
              <CardDescription className="text-base">
                Plotësoni detajet tuaja më poshtë
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Family Name */}
                <div className="space-y-2">
                  <Label htmlFor="familyName" className="text-base">
                    Emri i Familjes / Siç jeni thirrur në ftesë *
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="familyName"
                      required
                      placeholder="p.sh. Familja Hoxha"
                      value={formData.familyName}
                      onChange={(e) =>
                        setFormData({ ...formData, familyName: e.target.value })
                      }
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Attending */}
                <div className="space-y-3">
                  <Label className="text-base">
                    A do të merrni pjesë në dasëm? *
                  </Label>
                  <RadioGroup
                    required
                    value={formData.attending}
                    onValueChange={(value) =>
                      setFormData({ ...formData, attending: value })
                    }
                    className="flex flex-col gap-3"
                  >
                    <div className="flex items-center space-x-3 border border-gold-soft/30 rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label
                        htmlFor="yes"
                        className="flex-1 cursor-pointer text-base font-normal"
                      >
                        Po, me kënaqësi do të marr pjesë! 🎉
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 border border-gold-soft/30 rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer">
                      <RadioGroupItem value="no" id="no" />
                      <Label
                        htmlFor="no"
                        className="flex-1 cursor-pointer text-base font-normal"
                      >
                        Më vjen keq, nuk mund të marr pjesë
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Guest Count - Only show if attending */}
                {formData.attending === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2"
                  >
                    <Label htmlFor="guestCount" className="text-base">
                      Numri i personave që do të vijnë *
                    </Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min={1}
                      max={250}
                      required
                      value={formData.guestCount}
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = parseInt(val, 10);
                        if (val === "") {
                          setFormData((prev) => ({ ...prev, guestCount: "" }));
                        } else if (!Number.isNaN(num) && num < 1) {
                          setFormData((prev) => ({ ...prev, guestCount: "1" }));
                        } else {
                          setFormData((prev) => ({ ...prev, guestCount: val }));
                        }
                      }}
                      onBlur={(e) => {
                        const val = e.target.value;
                        const num = parseInt(val, 10);
                        if (formData.attending === "yes" && (val === "" || Number.isNaN(num) || num < 1)) {
                          setFormData((prev) => ({ ...prev, guestCount: "1" }));
                        }
                      }}
                      className="h-12"
                    />
                    <p className="text-sm text-muted-foreground">
                      Përfshini të gjithë anëtarët e familjes që do të vijnë
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full h-12 text-base bg-gradient-to-r from-gold-soft to-gold hover:from-gold hover:to-gold-soft transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Duke dërguar...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Dërguar me sukses!
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 mr-2 fill-current" />
                      Konfirmo pranimin
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
