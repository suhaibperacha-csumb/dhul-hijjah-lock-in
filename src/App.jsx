import { useEffect, useRef, useState } from "react"

const goals = [
  "Fajr in the masjid",
  "Stay until Ishraq",
  "Quran",
  "Morning adhkar",
  "Evening adhkar",
  "Duha prayer",
  "Sunnah prayers",
  "Fasting",
  "Daily sadaqah",
  "Make du'a",
  "Night prayer",
  "Avoid sins",
]

const donations = [
  {
    title: "Udhiya / Qurbani",
    description:
      "Give your Qurbani through HHRD and help provide meat to families in need.",
    button: "Give Udhiya",
    url: "https://www1.hhrd.org/Campaigns/Qurbani",
  },
  {
    title: "Sadaqah",
    description:
      "Give any amount as sadaqah during these blessed days, even if it is small.",
    button: "Give Sadaqah",
    url: "https://www1.hhrd.org/Programs/Sadaqah",
  },
  {
    title: "Zakat",
    description:
      "Fulfill your zakat through HHRD and support eligible programs around the world.",
    button: "Give Zakat",
    url: "https://www1.hhrd.org/zakat",
  },
]

const virtues = {
  "Fajr in the masjid": {
    title: "Pray Fajr with the believers",
    text: "The Prophet ﷺ said: Whoever prays Fajr is under the protection of Allah. Start your day by putting yourself under Allah's protection.",
    reference: "Jami' at-Tirmidhi 221",
    links: [{ label: "Open source", url: "https://sunnah.com/tirmidhi:221" }],
  },
  "Stay until Ishraq": {
    title: "Reward like Hajj and Umrah",
    text: "The Prophet ﷺ said that whoever prays Fajr in congregation, sits remembering Allah until the sun rises, then prays two rak'ah, will have a reward like Hajj and Umrah.",
    reference: "Jami' at-Tirmidhi 586",
    links: [{ label: "Open source", url: "https://sunnah.com/tirmidhi:586" }],
  },
  Quran: {
    title: "Hold tight to the Qur'an",
    text: "Make the Qur'an a daily anchor in these blessed days. Recite, reflect, and let it guide the way you spend your day.",
    reference: "Surah Al-Isra 17:78 to 17:88",
    links: [{ label: "Open source", url: "https://quran.com/al-isra/78-88" }],
  },
  "Morning adhkar": {
    title: "Start your morning with dhikr",
    text: "Use the Wa Iyyaka Nastaeen app for morning duas and adhkar. It has a collection of duas and morning and evening athkar from the Qur'an and authentic Hadith.",
    reference: "Wa Iyyaka Nastaeen app",
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/wa-iyyaka-nastaeen/id972441057",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?hl=en_US&id=com.alhuda.duas.iyykanastaeen",
      },
    ],
  },
  "Evening adhkar": {
    title: "End your day with dhikr",
    text: "Use the Wa Iyyaka Nastaeen app for evening duas and adhkar. This is a simple way to end the day with remembrance, protection, and reliance upon Allah.",
    reference: "Wa Iyyaka Nastaeen app",
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/wa-iyyaka-nastaeen/id972441057",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?hl=en_US&id=com.alhuda.duas.iyykanastaeen",
      },
    ],
  },
  "Duha prayer": {
    title: "A daily charity for your body",
    text: "Duha is a beautiful voluntary prayer in the morning. It is an easy way to add extra worship and gratitude into your day.",
    reference: "Riyad as-Salihin 1140",
    links: [
      { label: "Open source", url: "https://sunnah.com/riyadussalihin:1140" },
    ],
  },
  "Sunnah prayers": {
    title: "Build your home in Jannah",
    text: "Stay consistent with the sunnah prayers connected to the obligatory prayers. Small daily consistency can become huge with Allah.",
    reference: "Sunan Ibn Majah 1140",
    links: [{ label: "Open source", url: "https://sunnah.com/ibnmajah:1140" }],
  },
  Fasting: {
    title: "Fast the blessed days",
    text: "Fasting during these days is a powerful way to increase your worship, especially on the Day of Arafah for those not performing Hajj.",
    reference: "Sunan Abi Dawud 2437",
    links: [{ label: "Open source", url: "https://sunnah.com/abudawud:2437" }],
  },
  "Daily sadaqah": {
    title: "Give every day if you can",
    text: "These are days where righteous deeds are especially beloved. Even a small daily sadaqah can be a major part of your lock in.",
    reference: "Sahih al-Bukhari 969",
    links: [{ label: "Open source", url: "https://sunnah.com/bukhari:969" }],
  },
  "Make du'a": {
    title: "Ask Allah for everything",
    text: "Use these days to make serious du'a for forgiveness, guidance, Jannah, protection from Hellfire, your family, the Ummah, and your future.",
    reference: "Sahih al-Bukhari 969",
    links: [{ label: "Open source", url: "https://sunnah.com/bukhari:969" }],
  },
  "Night prayer": {
    title: "Stand at night, even if it is short",
    text: "Night prayer is one of the greatest private acts of worship. Even two rak'ah before sleeping or before Fajr can be part of your lock in.",
    reference: "Jami' at-Tirmidhi 758 and Sahih al-Bukhari Book 19",
    links: [
      { label: "Tirmidhi source", url: "https://sunnah.com/tirmidhi:758" },
      { label: "More virtues", url: "https://sunnah.com/bukhari/19" },
    ],
  },
  "Avoid sins": {
    title: "Leaving sins is part of the lock in",
    text: "Good deeds are multiplied during sacred times, and sins are also more serious. Guard your eyes, tongue, phone, time, and heart during these blessed days.",
    reference:
      "Multiplication of Rewards and Sins at Sacred Places and in Sacred Times",
    links: [
      {
        label: "Open source",
        url: "https://www.aliftaa.jo/research-fatwa-english/3626/Multiplication-of-Rewards-and-Sins-at-Sacred-Places-and-in-Sacred-Times",
      },
    ],
  },
}

const days = Array.from({ length: 10 }, (_, index) => index + 1)

function App() {
  const trackerRef = useRef(null)

  const [selectedGoals, setSelectedGoals] = useState(() => {
    const savedGoals = localStorage.getItem("selectedGoals")
    return savedGoals ? JSON.parse(savedGoals) : []
  })

  const [planCreated, setPlanCreated] = useState(() => {
    const savedPlanCreated = localStorage.getItem("planCreated")
    return savedPlanCreated ? JSON.parse(savedPlanCreated) : false
  })

  const [activeDay, setActiveDay] = useState(() => {
    const savedActiveDay = localStorage.getItem("activeDay")
    return savedActiveDay ? JSON.parse(savedActiveDay) : 1
  })

  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem("completedTasks")
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : {}
  })

  const [dailyNotes, setDailyNotes] = useState(() => {
    const savedDailyNotes = localStorage.getItem("dailyNotes")
    return savedDailyNotes ? JSON.parse(savedDailyNotes) : {}
  })

  const [donatedAmount, setDonatedAmount] = useState(() => {
    const savedDonatedAmount = localStorage.getItem("donatedAmount")
    return savedDonatedAmount ? JSON.parse(savedDonatedAmount) : 0
  })

  const [showCustomGoal, setShowCustomGoal] = useState(false)
  const [donationInput, setDonationInput] = useState("")
  const [customGoal, setCustomGoal] = useState("")
  const [activeVirtue, setActiveVirtue] = useState(null)

  useEffect(() => {
    document.title = "The Great Dhul Hijjah Lock In"
  }, [])

  useEffect(() => {
    localStorage.setItem("selectedGoals", JSON.stringify(selectedGoals))
  }, [selectedGoals])

  useEffect(() => {
    localStorage.setItem("planCreated", JSON.stringify(planCreated))
  }, [planCreated])

  useEffect(() => {
    localStorage.setItem("activeDay", JSON.stringify(activeDay))
  }, [activeDay])

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks))
  }, [completedTasks])

  useEffect(() => {
    localStorage.setItem("dailyNotes", JSON.stringify(dailyNotes))
  }, [dailyNotes])

  useEffect(() => {
    localStorage.setItem("donatedAmount", JSON.stringify(donatedAmount))
  }, [donatedAmount])

  function buildPlan() {
    setPlanCreated(true)

    setTimeout(() => {
      trackerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  function toggleGoal(goal) {
    setSelectedGoals((currentGoals) =>
      currentGoals.includes(goal)
        ? currentGoals.filter((item) => item !== goal)
        : [...currentGoals, goal]
    )

    setPlanCreated(false)
  }

  function addCustomGoal() {
    const cleanedGoal = customGoal.trim()

    if (!cleanedGoal) return
    if (selectedGoals.includes(cleanedGoal)) return

    setSelectedGoals((currentGoals) => [...currentGoals, cleanedGoal])
    setCustomGoal("")
    setPlanCreated(false)
  }

  function removeGoal(goal) {
    setSelectedGoals((currentGoals) =>
      currentGoals.filter((item) => item !== goal)
    )

    setPlanCreated(false)
  }

  function toggleTask(day, goal) {
    const taskId = `day-${day}-${goal}`

    setCompletedTasks((currentTasks) => ({
      ...currentTasks,
      [taskId]: !currentTasks[taskId],
    }))
  }

  function isTaskComplete(day, goal) {
    const taskId = `day-${day}-${goal}`
    return Boolean(completedTasks[taskId])
  }

  function getDayProgress(day) {
    if (selectedGoals.length === 0) return 0

    const completedCount = selectedGoals.filter((goal) =>
      isTaskComplete(day, goal)
    ).length

    return Math.round((completedCount / selectedGoals.length) * 100)
  }

  function updateDailyNote(day, value) {
    setDailyNotes((currentNotes) => ({
      ...currentNotes,
      [`day-${day}`]: value,
    }))
  }

  function clearDailyNote(day) {
    const confirmClear = window.confirm(
      "Are you sure you want to clear this day's notes?"
    )

    if (!confirmClear) return

    setDailyNotes((currentNotes) => ({
      ...currentNotes,
      [`day-${day}`]: "",
    }))
  }

  function addDonation() {
    const amount = Number(donationInput)

    if (!amount || amount <= 0) return

    setDonatedAmount((currentAmount) => currentAmount + amount)
    setDonationInput("")
  }

  function resetDonationAmount() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your donation tracker?"
    )

    if (confirmReset) {
      setDonatedAmount(0)
      setDonationInput("")
    }
  }

  function resetProgress() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all checklist progress and daily notes?"
    )

    if (confirmReset) {
      setCompletedTasks({})
      setDailyNotes({})
      setActiveDay(1)
    }
  }

  function resetAllData() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset everything on this device?"
    )

    if (!confirmReset) return

    localStorage.removeItem("selectedGoals")
    localStorage.removeItem("planCreated")
    localStorage.removeItem("activeDay")
    localStorage.removeItem("completedTasks")
    localStorage.removeItem("dailyNotes")
    localStorage.removeItem("donatedAmount")

    setSelectedGoals([])
    setPlanCreated(false)
    setActiveDay(1)
    setCompletedTasks({})
    setDailyNotes({})
    setDonatedAmount(0)
    setDonationInput("")
    setCustomGoal("")
    setShowCustomGoal(false)
    setActiveVirtue(null)
  }

  const activeDayProgress = getDayProgress(activeDay)
  const activeDayNote = dailyNotes[`day-${activeDay}`] || ""

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <section className="mx-auto max-w-5xl px-4 py-6 sm:px-5 sm:py-10">
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-900 to-stone-900 p-5 shadow-2xl sm:p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300 sm:text-sm sm:tracking-[0.3em]">
            Dhul Hijjah 1447
          </p>

          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            The Great Lock In
          </h1>

          <p className="mt-4 max-w-2xl text-base text-emerald-50 sm:text-lg">
            Build your worship plan for the first 10 days, track your progress,
            save your du'a list, and add sadaqah to your daily routine.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={buildPlan}
              disabled={selectedGoals.length === 0}
              className={`w-full rounded-2xl px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${
                planCreated
                  ? "bg-emerald-500 text-emerald-950"
                  : "bg-white text-emerald-950"
              }`}
            >
              {selectedGoals.length === 0
                ? "Choose at least 1 goal"
                : planCreated
                  ? "Plan built ✓"
                  : `Build my plan with ${selectedGoals.length} goals`}
            </button>

            {planCreated && (
              <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-200">
                Your tracker is ready below.
              </p>
            )}
          </div>
        </div>

        <section className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold text-emerald-300">1. Pick goals</p>
            <h2 className="mt-2 text-xl font-black">Choose your focus</h2>
            <p className="mt-2 text-sm text-stone-300">
              Select the actions you want to lock in for the first 10 days.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold text-emerald-300">2. Track daily</p>
            <h2 className="mt-2 text-xl font-black">Check off each day</h2>
            <p className="mt-2 text-sm text-stone-300">
              Move through Day 1 to Day 10 and save your progress on this
              device.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold text-emerald-300">3. Give more</p>
            <h2 className="mt-2 text-xl font-black">Add sadaqah</h2>
            <p className="mt-2 text-sm text-stone-300">
              Use the donation section and track your personal giving.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Choose your focus</h2>

          <p className="mt-2 text-stone-300">
            Pick the actions you want in your daily checklist.
          </p>

          <p className="mt-2 text-sm font-semibold text-emerald-300">
            Tap any cards below to select or unselect them, then build your
            plan.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const isSelected = selectedGoals.includes(goal)

              return (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  className={`rounded-2xl border p-4 text-left font-semibold transition ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-500 text-emerald-950"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{goal}</span>
                    <span>{isSelected ? "✓" : "+"}</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold">Add your own goal</h3>

                <p className="mt-1 text-sm text-stone-300">
                  Add something personal when you need it.
                </p>
              </div>

              <button
                onClick={() => setShowCustomGoal((current) => !current)}
                className="rounded-xl bg-white px-4 py-2 text-sm font-black text-emerald-950"
              >
                {showCustomGoal ? "Hide" : "Show"}
              </button>
            </div>

            {showCustomGoal && (
              <div className="mt-4">
                <p className="text-sm text-stone-300">
                  Examples: call family, memorize a surah, delete a bad habit.
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={customGoal}
                    onChange={(event) => setCustomGoal(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") addCustomGoal()
                    }}
                    placeholder="Example: Make du'a for my parents"
                    className="w-full rounded-xl border border-white/10 bg-stone-950 px-4 py-3 text-white outline-none placeholder:text-stone-500"
                  />

                  <button
                    onClick={addCustomGoal}
                    className="rounded-xl bg-emerald-500 px-5 py-3 font-black text-emerald-950"
                  >
                    Add goal
                  </button>
                </div>
              </div>
            )}
          </div>

          {selectedGoals.length > 0 && (
            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-950/30 p-4">
              <h3 className="font-bold">Selected goals</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedGoals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => removeGoal(goal)}
                    className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-bold text-emerald-950"
                  >
                    {goal} ×
                  </button>
                ))}
              </div>

              <p className="mt-3 text-xs text-emerald-100">
                Tap a selected goal above to remove it.
              </p>

              <button
                onClick={buildPlan}
                className={`mt-4 w-full rounded-2xl px-5 py-3 font-bold sm:w-auto ${
                  planCreated
                    ? "bg-emerald-500 text-emerald-950"
                    : "bg-white text-emerald-950"
                }`}
              >
                {planCreated
                  ? "Update my plan ✓"
                  : `Build my plan with ${selectedGoals.length} goals`}
              </button>

              {planCreated && (
                <p className="mt-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-200">
                  Your tracker is ready below. Click update if you changed your goals.
                </p>
              )}
            </div>
          )}
        </section>

        {planCreated && (
          <>
            <section
              ref={trackerRef}
              className="mt-8 scroll-mt-5 rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your 10 day tracker</h2>

                  <p className="mt-2 text-stone-300">
                    Choose the day, check off your actions, and come back later.
                    Your progress saves on this device.
                  </p>
                </div>

                <button
                  onClick={resetProgress}
                  className="w-full rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-stone-200 hover:bg-white/10 sm:w-auto"
                >
                  Reset tracker
                </button>
              </div>

              <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10">
                {days.map((day) => {
                  const dayProgress = getDayProgress(day)
                  const isActive = activeDay === day

                  return (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`rounded-2xl border p-3 text-center transition ${
                        isActive
                          ? "border-emerald-300 bg-emerald-500 text-emerald-950"
                          : "border-white/10 bg-stone-900 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm font-black">Day {day}</p>
                      <p className="mt-1 text-xs">{dayProgress}%</p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-stone-900 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">Day {activeDay}</h3>
                  <p className="font-bold text-emerald-300">
                    {activeDayProgress}% complete
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${activeDayProgress}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {selectedGoals.map((goal) => {
                  const complete = isTaskComplete(activeDay, goal)
                  const hasVirtue = Boolean(virtues[goal])

                  return (
                    <div
                      key={goal}
                      className={`rounded-2xl p-4 transition ${
                        complete ? "bg-emerald-500/20" : "bg-stone-900"
                      }`}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-1 items-center gap-3">
                          <input
                            type="checkbox"
                            checked={complete}
                            onChange={() => toggleTask(activeDay, goal)}
                            className="h-5 w-5 shrink-0 accent-emerald-500"
                          />

                          <span
                            className={`flex-1 font-semibold ${
                              complete ? "text-emerald-200 line-through" : ""
                            }`}
                          >
                            {goal}
                          </span>
                        </div>

                        {hasVirtue && (
                          <button
                            onClick={() => setActiveVirtue(goal)}
                            className="w-full rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-emerald-300 hover:bg-white/10 sm:w-auto"
                          >
                            See Virtues
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-stone-900 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Daily notes and du'a</h3>
                    <p className="mt-1 text-sm text-stone-300">
                      Write your du'a list, reflections, or what you want to
                      focus on today.
                    </p>
                  </div>

                  {activeDayNote && (
                    <button
                      onClick={() => clearDailyNote(activeDay)}
                      className="w-full rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-stone-300 hover:bg-white/10 sm:w-auto"
                    >
                      Clear notes
                    </button>
                  )}
                </div>

                <textarea
                  value={activeDayNote}
                  onChange={(event) =>
                    updateDailyNote(activeDay, event.target.value)
                  }
                  placeholder="Example: Ya Allah forgive me, guide my family, accept my deeds, protect the Ummah..."
                  className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-stone-950 p-4 text-white outline-none placeholder:text-stone-500"
                />

                <p className="mt-2 text-xs text-emerald-300">
                  Saved automatically for Day {activeDay}.
                </p>
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-950/40 p-4 sm:p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                    Give in the best days
                  </p>

                  <h2 className="mt-3 text-3xl font-black">
                    Support HHRD campaigns
                  </h2>

                  <p className="mt-2 max-w-2xl text-emerald-50">
                    Add sadaqah to your daily lock in, give your Udhiya, or
                    fulfill your zakat through Helping Hand USA.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-emerald-100">You donated so far</p>
                  <p className="mt-1 text-3xl font-black">
                    ${donatedAmount.toLocaleString()}
                  </p>

                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="number"
                      min="1"
                      value={donationInput}
                      onChange={(event) => setDonationInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") addDonation()
                      }}
                      placeholder="Amount"
                      className="w-full rounded-xl border border-white/10 bg-stone-950 px-3 py-2 text-white outline-none placeholder:text-stone-500"
                    />

                    <button
                      onClick={addDonation}
                      className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-emerald-950"
                    >
                      Add
                    </button>
                  </div>

                  <button
                    onClick={resetDonationAmount}
                    className="mt-3 text-sm font-bold text-emerald-200 hover:text-white"
                  >
                    Reset donation tracker
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {donations.map((donation) => (
                  <div
                    key={donation.title}
                    className="rounded-2xl border border-white/10 bg-stone-950/70 p-5"
                  >
                    <h3 className="text-xl font-black">{donation.title}</h3>

                    <p className="mt-2 text-sm text-stone-300">
                      {donation.description}
                    </p>

                    <a
                      href={donation.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block w-full rounded-xl bg-white px-4 py-2 text-center text-sm font-black text-emerald-950 sm:w-auto"
                    >
                      {donation.button}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <footer className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-5 text-center">
          <p className="text-sm font-bold text-emerald-300">
            May Allah accept from us and you.
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-stone-300">
            This tracker saves only on your device. No account is needed, and
            your checklist, notes, and donation tracker stay in your browser.
          </p>

          <button
            onClick={resetAllData}
            className="mt-4 rounded-xl border border-red-400/30 px-4 py-2 text-sm font-bold text-red-200 hover:bg-red-500/10"
          >
            Reset all saved data
          </button>
        </footer>
      </section>

      {activeVirtue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-white/10 bg-stone-950 p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
                  {activeVirtue}
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {virtues[activeVirtue].title}
                </h2>
              </div>

              <button
                onClick={() => setActiveVirtue(null)}
                className="rounded-full bg-white/10 px-3 py-1 text-xl font-black hover:bg-white/20"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-stone-200">{virtues[activeVirtue].text}</p>

            <div className="mt-5 rounded-2xl bg-white/5 p-4">
              <p className="text-sm font-bold text-stone-400">Reference</p>

              <p className="mt-1 font-semibold text-emerald-300">
                {virtues[activeVirtue].reference}
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {virtues[activeVirtue].links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-xl bg-emerald-500 px-4 py-2 text-center text-sm font-black text-emerald-950"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
