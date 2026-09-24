import { Check, CheckCircle2, RotateCcw, Trophy, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { attemptsFor } from "@/lib/selectors";
import { useStore } from "@/lib/use-store";
import type { Lesson } from "@/lib/types";

interface QuizResult {
  score: number;
  passed: boolean;
  answers: number[];
  correctIndexes: number[];
  explanations: string[];
}

export function LessonQuiz({
  courseId,
  lesson,
  enabled,
}: {
  courseId: string;
  lesson: Lesson;
  enabled: boolean;
}) {
  const { state, user, submitQuiz } = useStore();
  const [answers, setAnswers] = useState<number[]>(() => lesson.quiz.map(() => -1));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAnswers(lesson.quiz.map(() => -1));
    setResult(null);
  }, [lesson.id, lesson.quiz]);

  const attempts = useMemo(
    () => (user ? attemptsFor(state, user.id, lesson.id) : []),
    [lesson.id, state, user],
  );
  const highest = attempts.length ? Math.max(...attempts.map((attempt) => attempt.score)) : null;
  const complete = answers.every((answer) => answer >= 0);

  if (!enabled) {
    return (
      <div className="rounded-2xl border border-dashed bg-muted/45 p-8 text-center">
        <Trophy className="mx-auto size-8 text-muted-foreground" />
        <h3 className="mt-3 text-lg font-extrabold text-navy">Quiz available after enrollment</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The free preview includes the video only. Enroll to check your understanding.
        </p>
      </div>
    );
  }

  if (!lesson.quiz.length) {
    return (
      <p className="rounded-xl bg-muted p-5 text-sm text-muted-foreground">
        No quiz has been added to this lesson.
      </p>
    );
  }

  const submit = async () => {
    if (!user || !complete) return;
    setSubmitting(true);
    const response = await submitQuiz({ courseId, lessonId: lesson.id, answers: [...answers] });
    setSubmitting(false);
    if (!response.ok || !response.evaluation) {
      toast.error(response.error ?? "The quiz could not be graded. Please try again.");
      return;
    }
    const { attempt, correctIndexes, explanations } = response.evaluation;
    const next = {
      score: attempt.score,
      passed: attempt.passed,
      answers: attempt.answers,
      correctIndexes,
      explanations,
    };
    setResult(next);
    if (attempt.passed) toast.success("Quiz passed. Lesson marked complete.");
    else toast.error("Not quite. Review the explanations and try again.");
  };

  const retake = () => {
    setAnswers(lesson.quiz.map(() => -1));
    setResult(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-navy">Lesson quiz</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pass with 70% or higher. Attempts are unlimited.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            {attempts.length} {attempts.length === 1 ? "attempt" : "attempts"}
          </Badge>
          {highest !== null && (
            <Badge className="bg-accent text-accent-foreground shadow-none">Best: {highest}%</Badge>
          )}
        </div>
      </div>

      {result && (
        <div
          className={`mt-6 rounded-2xl border p-5 ${result.passed ? "border-success/25 bg-success/8" : "border-destructive/20 bg-destructive/5"}`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-xl ${result.passed ? "bg-success text-white" : "bg-destructive text-white"}`}
            >
              {result.passed ? <CheckCircle2 className="size-5" /> : <X className="size-5" />}
            </span>
            <div>
              <p
                className={`text-xs font-extrabold uppercase tracking-wide ${result.passed ? "text-success" : "text-destructive"}`}
              >
                {result.passed ? "Passed" : "Try again"}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-navy">{result.score}%</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.passed
                  ? "This lesson is now marked complete."
                  : "Read the explanations below, then retake when you are ready."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-5">
        {lesson.quiz.map((question, questionIndex) => {
          const chosen = result?.answers[questionIndex];
          return (
            <fieldset key={question.id} className="rounded-2xl border bg-card p-5">
              <legend className="sr-only">Question {questionIndex + 1}</legend>
              <p className="text-xs font-extrabold uppercase tracking-wide text-primary">
                Question {questionIndex + 1} of {lesson.quiz.length}
              </p>
              <h3 className="mt-2 font-extrabold leading-6 text-navy">{question.text}</h3>
              <RadioGroup
                value={(answers[questionIndex] ?? -1) >= 0 ? String(answers[questionIndex]) : ""}
                onValueChange={(value) =>
                  setAnswers((current) =>
                    current.map((answer, index) =>
                      index === questionIndex ? Number(value) : answer,
                    ),
                  )
                }
                disabled={Boolean(result)}
                className="mt-4 gap-2.5"
              >
                {question.choices.map((choice, choiceIndex) => {
                  const correct = result && choiceIndex === result.correctIndexes[questionIndex];
                  const wrong =
                    result &&
                    choiceIndex === chosen &&
                    choiceIndex !== result.correctIndexes[questionIndex];
                  return (
                    <Label
                      key={choice}
                      htmlFor={`${question.id}-${choiceIndex}`}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm font-semibold transition ${
                        correct
                          ? "border-success/35 bg-success/8 text-success"
                          : wrong
                            ? "border-destructive/30 bg-destructive/5 text-destructive"
                            : "hover:border-primary/30 hover:bg-accent/30"
                      }`}
                    >
                      <RadioGroupItem
                        id={`${question.id}-${choiceIndex}`}
                        value={String(choiceIndex)}
                      />
                      <span className="flex-1">{choice}</span>
                      {correct && <Check className="size-4" />}
                      {wrong && <X className="size-4" />}
                    </Label>
                  );
                })}
              </RadioGroup>
              {result && (
                <div className="mt-4 rounded-xl bg-muted/65 p-4 text-sm leading-6">
                  <span className="font-extrabold text-navy">Why: </span>
                  <span className="text-muted-foreground">
                    {result.explanations[questionIndex] || "Review the lesson and try again."}
                  </span>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      {result ? (
        <Button onClick={retake} variant="outline" size="lg" className="mt-6">
          <RotateCcw /> Retake quiz
        </Button>
      ) : (
        <Button onClick={submit} disabled={!complete || submitting} size="lg" className="mt-6">
          {submitting ? "Grading…" : "Submit answers"}
        </Button>
      )}
    </div>
  );
}
