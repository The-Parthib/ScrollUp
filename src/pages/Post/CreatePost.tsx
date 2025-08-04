import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image, Upload } from "lucide-react";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import * as React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ICreatePostProps {}

const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center">
      <Card className="max-w-2xl w-full shadow-xl border-0 backdrop-blur-sm">
        <CardHeader className="dark:bg-gradient-to-b from-blue-600 to-gray-950 rounded-t-lg">
          <CardTitle className="text-center text-xl font-bold flex items-center justify-center gap-2">
            Create New Post
          </CardTitle>
          <p className="text-center text-sm">Share your moment with ScrollUp</p>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Caption Section */}
            <div className="space-y-3">
              <Label
                htmlFor="caption"
                className="text-lg font-semibold  flex items-center gap-2"
              >
                <span>✨</span> What's on your mind?
              </Label>
              <Textarea
                id="caption"
                placeholder="Share your thoughts, tag friends, or describe your photo..."
                className="min-h-[120px] resize-none border-2 border-gray-200 focus:border-purple-400 transition-colors duration-200 text-base"
              />
              <div className="text-right text-sm text-gray-500">0/500</div>
            </div>

            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold  flex items-center gap-2">
                <Image className="w-5 h-5" />
                Add Photos
              </Label>

              {/* Drag and Drop Area */}
              <FileUploaderMinimal
                sourceList="local, camera, gdrive"
                filesViewMode="grid"
                cloudImageEditorAutoOpen={true}
                classNameUploader={
                  theme === "light"
                    ? "uc-light"
                    : theme === "dark"
                    ? "uc-dark"
                    : "uc-purple"
                }
                pubkey="105fdcb050432f1a1bed"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-12 py-3 rounded-full transition-all duration-200 transform hover:scale-105">
                <Upload className="w-5 h-5 mr-2" />
                Share to ScrollUp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;
