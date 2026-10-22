import { AlertCircle, Check, CheckCircle2, RotateCcw, Trophy, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { attemptsFor } from "@/lib/selectors";
import type { Lesson } from "@/lib/types";
import { useStore } from "@/lib/use-store";

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
  const resultRef = useRef<HTMLDivElement>(null);

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
  const answeredCount = answers.filter((answer) => answer >= 0).length;

  useEffect(() => {
    if (!result) return;
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    resultRef.current?.focus({ preventScroll: true });
  }, [result]);

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
    if (!user) {
      toast.error("Please sign in before submitting the quiz.");
      return;
    }
    if (!complete) {
      toast.error(
        `Answer all questions first (${answeredCount} of ${lesson.quiz.length} complete).`,
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitQuiz({ courseId, lessonId: lesson.id, answers: [...answers] });
      if (!response.ok || !response.evaluation) {
        toast.error(response.error ?? "The quiz could not be graded. Please try again.");
        return;
      }

      const { attempt, correctIndexes, explanations } = response.evaluation;
      if (
        correctIndexes.length !== lesson.quiz.length ||
        explanations.length !== lesson.quiz.length
      ) {
        toast.error("The quiz result was incomplete. Please try submitting again.");
        return;
      }

      setResult({
        score: attempt.score,
        passed: attempt.passed,
        answers: attempt.answers,
        correctIndexes,
        explanations,
      });
      if (attempt.passed) toast.success("Quiz passed. Lesson marked complete.");
      else toast.error("Not quite. Review every answer below, then try again.");
    } catch {
      toast.error("The quiz could not be graded. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const retake = () => {
    setAnswers(lesson.quiz.map(() => -1));
    setResult(null);
  };

  const correctCount = result
    ? result.answers.filter((answer, index) => answer === result.correctIndexes[index]).length
    : 0;

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
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`mt-6 rounded-2xl border p-5 outline-none ${result.passed ? "border-success/25 bg-success/8" : "border-destructive/20 bg-destructive/5"}`}
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
              <p className="mt-1 font-bold text-navy">
                {correctCount} of {lesson.quiz.length} correct
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.passed
                  ? "This lesson is now marked complete. Review your answers below."
                  : "Review each correction below, then retake when you are ready."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-5">
        {lesson.quiz.map((question, questionIndex) => {
          const chosen = result?.answers[questionIndex];
          const correctIndex = result?.correctIndexes[questionIndex];
          const isCorrect = result ? chosen === correctIndex : false;

          return (
            <fieldset
              key={question.id}
              className={`rounded-2xl border bg-card p-5 ${result ? (isCorrect ? "border-success/35" : "border-destructive/30") : ""}`}
            >
              <legend className="sr-only">Question {questionIndex + 1}</legend>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-extrabold uppercase tracking-wide text-brand-foreground">
                  Question {questionIndex + 1} of {lesson.quiz.length}
                </p>
                {result && (
                  <Badge
                    className={
                      isCorrect
                        ? "bg-success text-white shadow-none"
                        : "bg-destructive text-white shadow-none"
                    }
                  >
                    {isCorrect ? (
                      <Check className="mr-1 size-3.5" />
                    ) : (
                      <X className="mr-1 size-3.5" />
                    )}
                    {isCorrect ? "Correct" : "Incorrect"}
                  </Badge>
                )}
              </div>
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
                disabled={Boolean(result) || submitting}
                className="mt-4 gap-2.5"
              >
                {question.choices.map((choice, choiceIndex) => {
                  const correct = result && choiceIndex === correctIndex;
                  const wrong = result && choiceIndex === chosen && choiceIndex !== correctIndex;
                  return (
                    <Label
                      key={`${question.id}-${choiceIndex}`}
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
                <div className="mt-4 space-y-2 rounded-xl bg-muted/65 p-4 text-sm leading-6">
                  {!isCorrect && chosen !== undefined && (
                    <p>
                      <span className="font-extrabold text-destructive">Your answer: </span>
                      <span className="text-muted-foreground">
                        {question.choices[chosen] ?? "Unknown answer"}
                      </span>
                    </p>
                  )}
                  <p>
                    <span className="font-extrabold text-success">Correct answer: </span>
                    <span className="font-semibold text-navy">
                      {correctIndex === undefined
                        ? "Unavailable"
                        : (question.choices[correctIndex] ?? "Unavailable")}
                    </span>
                  </p>
                  <p>
                    <span className="font-extrabold text-navy">Explanation: </span>
                    <span className="text-muted-foreground">
                      {result.explanations[questionIndex] || "Review this point in the lesson."}
                    </span>
                  </p>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>

      {result ? (
        <Button type="button" onClick={retake} variant="outline" size="lg" className="mt-6">
          <RotateCcw /> Retake quiz
        </Button>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => void submit()} disabled={submitting} size="lg">
            {submitting ? "Grading…" : "Submit answers"}
          </Button>
          {!complete && (
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <AlertCircle className="size-4" /> {answeredCount} of {lesson.quiz.length} answered
            </p>
          )}
        </div>
      )}
    </div>
  );
}
