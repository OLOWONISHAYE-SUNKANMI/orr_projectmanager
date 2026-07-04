'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePmStore } from '@/store/pmStore';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/useTranslation';
import {
  Building,
  Users,
  Briefcase,
  Laptop,
  CheckCircle,
  X,
  Mail,
  ChevronRight,
  ChevronLeft,
  Plus,
  Upload,
  BarChart,
  Layout,
  Activity,
  ShieldCheck,
  Server,
  FileText,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';

const TOTAL_STEPS = 13;
const steps = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);

function CustomStepper({ activeStep }: { activeStep: number }) {
  const stepperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stepperRef.current) {
      const activeEl = stepperRef.current.children[activeStep * 2] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeStep]);

  return (
    <div className="flex flex-col items-center h-full max-h-[70vh] overflow-y-auto no-scrollbar py-4" ref={stepperRef}>
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${index <= activeStep ? "bg-[#61FD51] text-slate-950 shadow-lg shadow-[#61FD51]/20" : "bg-slate-800 text-slate-500"
              }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-0.5 h-8 my-1 transition-colors duration-500 ${index < activeStep ? "bg-[#61FD51]" : "bg-slate-800"}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ProjectManagerOnboarding() {
  const completeOnboarding = usePmStore(state => state.completeOnboarding);
  const router = useRouter();
  const { t } = useTranslation();

  const [step, setStep] = useState(1);
  
  // -- State for Step 2: Org Info --
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [hqLocation, setHqLocation] = useState('');
  const [isMultinational, setIsMultinational] = useState('');

  // -- State for Step 3: Project Overview --
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [businessChallenge, setBusinessChallenge] = useState('');
  const [objectives, setObjectives] = useState('');
  const [startDate, setStartDate] = useState('');
  const [completionTimeline, setCompletionTimeline] = useState('');

  // -- State for Step 4: Service Selection --
  const [selectedService, setSelectedService] = useState('');
  const [desiredOutcomes, setDesiredOutcomes] = useState<string[]>([]);
  
  const outcomeKeys = [
    'pmOnboarding.outcomesOptions.opEff',
    'pmOnboarding.outcomesOptions.regComp',
    'pmOnboarding.outcomesOptions.modSys',
    'pmOnboarding.outcomesOptions.workflow',
    'pmOnboarding.outcomesOptions.optBiz',
    'pmOnboarding.outcomesOptions.gov',
    'pmOnboarding.outcomesOptions.itInfra',
    'pmOnboarding.outcomesOptions.risk'
  ];

  // -- State for Step 5: Business Assessment --
  const [biggestChallenges, setBiggestChallenges] = useState('');
  const [complianceReqs, setComplianceReqs] = useState('');
  const [previousConsultants, setPreviousConsultants] = useState('');
  const [currentSystemsAssessment, setCurrentSystemsAssessment] = useState('');
  const [painPoints, setPainPoints] = useState('');

  // -- State for Step 6: Project Scope --
  const [departments, setDepartments] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [successCriteria, setSuccessCriteria] = useState('');
  const [risks, setRisks] = useState('');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');

  // -- State for Step 7: Team & Stakeholders --
  const [sponsor, setSponsor] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');
  const [internalPM, setInternalPM] = useState('');
  const [stakeholders, setStakeholders] = useState<string[]>([]);
  const [newStakeholder, setNewStakeholder] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newTeamMember, setNewTeamMember] = useState('');
  const [responsibilities, setResponsibilities] = useState('');

  // -- State for Step 8: Technology & Systems (Conditional) --
  const [currentTechStack, setCurrentTechStack] = useState('');
  const [integrations, setIntegrations] = useState('');
  const [workflowAutomation, setWorkflowAutomation] = useState('');
  const [cloudInfrastructure, setCloudInfrastructure] = useState('');
  const [cybersecurity, setCybersecurity] = useState('');
  const [legacySystems, setLegacySystems] = useState('');

  // -- State for Step 9: Compliance & Governance (Conditional) --
  const [regulatoryFrameworks, setRegulatoryFrameworks] = useState('');
  const [governanceDev, setGovernanceDev] = useState('');
  const [existingPolicies, setExistingPolicies] = useState('');
  const [recentAssessments, setRecentAssessments] = useState('');
  const [expectedAudits, setExpectedAudits] = useState('');
  const [governanceImprovements, setGovernanceImprovements] = useState('');

  // -- State for Step 10: Communication Preferences --
  const [communicationMethod, setCommunicationMethod] = useState('');
  const [updateFrequency, setUpdateFrequency] = useState('');
  const [reportRecipients, setReportRecipients] = useState('');

  // -- State for Step 11: Documents --
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

  // -- State for Step 12: Dashboard Preferences --
  const [dashboardWidgets, setDashboardWidgets] = useState<string[]>([]);
  const widgetOptions = [
    'Project Progress', 'Milestones', 'Tasks', 'Risks', 'Compliance Status',
    'System Health', 'Budget Tracking', 'Team Activity', 'Recent Documents',
    'Upcoming Meetings', 'Notifications'
  ];

  const handleToggleArrayItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleAddEmail = (email: string, setEmailStr: React.Dispatch<React.SetStateAction<string>>, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    const trimmed = email.trim();
    if (trimmed && trimmed.includes('@') && !list.includes(trimmed)) {
      setList([...list, trimmed]);
      setEmailStr('');
    }
  };

  const handleRemoveEmail = (emailToRemove: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.filter(e => e !== emailToRemove));
  };

  const getNextStep = (currentStep: number) => {
    let next = currentStep + 1;
    if (next === 8 && selectedService === t('pmOnboarding.svcStrategy')) {
      next = 9; // Skip IT questions
    }
    if (next === 9 && (selectedService === t('pmOnboarding.svcOpMgmt') || selectedService === t('pmOnboarding.svcOpConsult'))) {
      next = 10; // Skip Compliance questions
    }
    return next;
  };

  const getPrevStep = (currentStep: number) => {
    let prev = currentStep - 1;
    if (prev === 9 && (selectedService === t('pmOnboarding.svcOpMgmt') || selectedService === t('pmOnboarding.svcOpConsult'))) {
      prev = 8;
    }
    if (prev === 8 && selectedService === t('pmOnboarding.svcStrategy')) {
      prev = 7;
    }
    return prev;
  };

  const handleNext = () => {
    if (step === 2 && !companyName) return;
    if (step === 3 && !projectName) return;
    if (step === 4 && !selectedService) return;
    
    if (step < TOTAL_STEPS) {
      setStep(getNextStep(step));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(getPrevStep(step));
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      companyName, industry, companySize, hqLocation, isMultinational,
      projectName, projectDescription, businessChallenge, objectives, startDate, completionTimeline,
      selectedService, desiredOutcomes,
      biggestChallenges, complianceReqs, previousConsultants, currentSystemsAssessment, painPoints,
      departments, deliverables, successCriteria, risks, budget, priority,
      sponsor, primaryContact, internalPM, stakeholders, teamMembers, responsibilities,
      currentTechStack, integrations, workflowAutomation, cloudInfrastructure, cybersecurity, legacySystems,
      regulatoryFrameworks, governanceDev, existingPolicies, recentAssessments, expectedAudits, governanceImprovements,
      communicationMethod, updateFrequency, reportRecipients,
      uploadedDocuments,
      dashboardWidgets
    });
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/80 via-background to-surface text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Stepper Sidebar */}
        <div className="lg:w-32 flex justify-center py-6 border-b lg:border-b-0 lg:border-r border-white/10 bg-surface/50 backdrop-blur-md shrink-0 z-20">
          <div className="hidden lg:block sticky top-6 h-fit">
            <CustomStepper activeStep={step - 1} />
          </div>
          {/* Mobile horizontal stepper representation */}
          <div className="lg:hidden text-lg font-black text-[#61FD51]">
            {t('pmOnboarding.stepTitle').replace('{0}', step.toString()).replace('{1}', TOTAL_STEPS.toString())}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto px-6 py-10 relative no-scrollbar">
          {/* Background decorations */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#61FD51]/10 rounded-full blur-[100px] pointer-events-none fixed" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none fixed" />

          <div className="max-w-4xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">
            {/* Top actions */}
            <div className="flex justify-end gap-4 mb-4 lg:absolute lg:top-0 lg:right-0">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Header Area */}
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase text-[#61FD51] tracking-wider font-mono">
                {t('pmOnboarding.header')}
              </span>
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.welcomeTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.welcomeDesc')}</p>
                </div>
              )}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.orgTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.orgDesc')}</p>
                </div>
              )}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.projTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.projDesc')}</p>
                </div>
              )}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.serviceTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.serviceDesc')}</p>
                </div>
              )}
              {step === 5 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.baTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.baDesc')}</p>
                </div>
              )}
              {step === 6 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.scopeTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.scopeDesc')}</p>
                </div>
              )}
              {step === 7 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.teamTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.teamDesc')}</p>
                </div>
              )}
              {step === 8 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.itTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.itDesc')}</p>
                </div>
              )}
              {step === 9 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.compTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.compDesc')}</p>
                </div>
              )}
              {step === 10 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.commTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.commDesc')}</p>
                </div>
              )}
              {step === 11 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.docTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.docDesc')}</p>
                </div>
              )}
              {step === 12 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.dashTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.dashDesc')}</p>
                </div>
              )}
              {step === 13 && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-3xl font-bold mt-2 mb-4">{t('pmOnboarding.reviewTitle')}</h2>
                  <p className="text-lg text-slate-400">{t('pmOnboarding.reviewDesc')}</p>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 pb-16">
              {step === 1 && (
                <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                  <div className="w-28 h-28 bg-[#61FD51]/10 border border-[#61FD51]/20 text-[#61FD51] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#61FD51]/20">
                    <Building size={56} />
                  </div>
                  <h3 className="text-2xl font-bold text-white max-w-lg mx-auto leading-relaxed">
                    {t('pmOnboarding.stepWelcomeBody')}
                  </h3>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.orgName')}</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder={t('pmOnboarding.orgNamePlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.orgIndustry')}</label>
                    <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder={t('pmOnboarding.orgIndustryPlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.orgSize')}</label>
                    <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51] appearance-none">
                      <option value="" disabled>{t('pmOnboarding.orgSizePlaceholder')}</option>
                      <option value="1-50">1 - 50</option>
                      <option value="51-200">51 - 200</option>
                      <option value="201-500">201 - 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.orgHq')}</label>
                    <input type="text" value={hqLocation} onChange={(e) => setHqLocation(e.target.value)} placeholder={t('pmOnboarding.orgHqPlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.orgMulti')}</label>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setIsMultinational(t('pmOnboarding.yes'))} className={`flex-1 py-3 border rounded-xl font-bold transition-all ${isMultinational === t('pmOnboarding.yes') ? 'bg-[#61FD51]/10 border-[#61FD51] text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800'}`}>{t('pmOnboarding.yes')}</button>
                      <button type="button" onClick={() => setIsMultinational(t('pmOnboarding.no'))} className={`flex-1 py-3 border rounded-xl font-bold transition-all ${isMultinational === t('pmOnboarding.no') ? 'bg-[#61FD51]/10 border-[#61FD51] text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800'}`}>{t('pmOnboarding.no')}</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projName')}</label>
                    <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder={t('pmOnboarding.projNamePlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projDescField')}</label>
                    <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projChallenge')}</label>
                    <textarea value={businessChallenge} onChange={(e) => setBusinessChallenge(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projObj')}</label>
                    <textarea value={objectives} onChange={(e) => setObjectives(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projStart')}</label>
                      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51] [color-scheme:dark]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.projTimeline')}</label>
                      <input type="text" value={completionTimeline} onChange={(e) => setCompletionTimeline(e.target.value)} placeholder={t('pmOnboarding.projTimelinePlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 block mb-2">{t('pmOnboarding.svcFocus')}</label>
                    <div className="space-y-3">
                      {[t('pmOnboarding.svcStrategy'), t('pmOnboarding.svcOpMgmt'), t('pmOnboarding.svcOpConsult')].map(svc => (
                        <div
                          key={svc}
                          onClick={() => setSelectedService(svc)}
                          className={`
                            cursor-pointer border rounded-xl p-5 flex items-center gap-4 transition-all
                            ${selectedService === svc ? 'border-[#61FD51] bg-[#61FD51]/10 text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800 text-white'}
                          `}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedService === svc ? 'border-[#61FD51]' : 'border-slate-500'}`}>
                            {selectedService === svc && <div className="w-2.5 h-2.5 bg-[#61FD51] rounded-full" />}
                          </div>
                          <span className="font-bold">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 block mb-2">{t('pmOnboarding.svcOutcomes')}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {outcomeKeys.map(key => {
                        const outcomeText = t(key);
                        return (
                          <label key={outcomeText} className="flex items-start gap-3 p-4 border border-white/5 bg-slate-900/40 rounded-xl cursor-pointer hover:bg-slate-800 transition-colors">
                            <input 
                              type="checkbox" 
                              checked={desiredOutcomes.includes(outcomeText)}
                              onChange={() => handleToggleArrayItem(outcomeText, desiredOutcomes, setDesiredOutcomes)}
                              className="mt-1 w-4 h-4 rounded border-slate-600 text-[#61FD51] focus:ring-[#61FD51] focus:ring-offset-slate-900 bg-slate-800"
                            />
                            <span className="text-sm text-slate-300 font-medium">{outcomeText}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.baChallenge')}</label>
                    <textarea value={biggestChallenges} onChange={(e) => setBiggestChallenges(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.baCompliance')}</label>
                    <textarea value={complianceReqs} onChange={(e) => setComplianceReqs(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.baPrevConsult')}</label>
                    <textarea value={previousConsultants} onChange={(e) => setPreviousConsultants(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.baSystems')}</label>
                    <textarea value={currentSystemsAssessment} onChange={(e) => setCurrentSystemsAssessment(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.baPainPoints')}</label>
                    <textarea value={painPoints} onChange={(e) => setPainPoints(e.target.value)} rows={3} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopeDepts')}</label>
                    <input type="text" value={departments} onChange={(e) => setDepartments(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopeDeliverables')}</label>
                    <textarea value={deliverables} onChange={(e) => setDeliverables(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopeSuccess')}</label>
                    <textarea value={successCriteria} onChange={(e) => setSuccessCriteria(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopeRisks')}</label>
                    <textarea value={risks} onChange={(e) => setRisks(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopeBudget')}</label>
                    <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.scopePriority')}</label>
                    <div className="flex gap-4">
                      {[t('pmOnboarding.priorityHigh'), t('pmOnboarding.priorityMedium'), t('pmOnboarding.priorityLow')].map(p => (
                        <button key={p} type="button" onClick={() => setPriority(p)} className={`flex-1 py-3 border rounded-xl font-bold transition-all ${priority === p ? 'bg-[#61FD51]/10 border-[#61FD51] text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.teamSponsor')}</label>
                      <input type="text" value={sponsor} onChange={(e) => setSponsor(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.teamPrimary')}</label>
                      <input type="text" value={primaryContact} onChange={(e) => setPrimaryContact(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.teamInternal')}</label>
                      <input type="text" value={internalPM} onChange={(e) => setInternalPM(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.teamStakeholders')}</label>
                    <div className="flex gap-3">
                      <input type="email" value={newStakeholder} onChange={e => setNewStakeholder(e.target.value)} placeholder={t('pmOnboarding.emailPlaceholder')} className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                      <button type="button" onClick={() => handleAddEmail(newStakeholder, setNewStakeholder, stakeholders, setStakeholders)} className="bg-[#61FD51] hover:bg-[#52d743] text-slate-950 px-6 rounded-xl font-bold transition-colors">{t('pmOnboarding.addBtn')}</button>
                    </div>
                    {stakeholders.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {stakeholders.map(email => (
                          <span key={email} className="px-3 py-1.5 bg-[#61FD51]/10 text-[#61FD51] rounded-lg text-sm flex items-center gap-2">
                            {email} <X size={14} className="cursor-pointer" onClick={() => handleRemoveEmail(email, stakeholders, setStakeholders)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.teamInvite')}</label>
                    <div className="flex gap-3">
                      <input type="email" value={newTeamMember} onChange={e => setNewTeamMember(e.target.value)} placeholder={t('pmOnboarding.emailPlaceholder')} className="flex-1 bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                      <button type="button" onClick={() => handleAddEmail(newTeamMember, setNewTeamMember, teamMembers, setTeamMembers)} className="bg-[#61FD51] hover:bg-[#52d743] text-slate-950 px-6 rounded-xl font-bold transition-colors">{t('pmOnboarding.addBtn')}</button>
                    </div>
                    {teamMembers.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {teamMembers.map(email => (
                          <span key={email} className="px-3 py-1.5 bg-[#61FD51]/10 text-[#61FD51] rounded-lg text-sm flex items-center gap-2">
                            {email} <X size={14} className="cursor-pointer" onClick={() => handleRemoveEmail(email, teamMembers, setTeamMembers)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.assignResp')}</label>
                    <textarea value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} rows={3} placeholder={t('pmOnboarding.respPlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-xl mb-4 flex gap-3 items-start">
                    <Server className="shrink-0 mt-0.5" size={20} />
                    <p className="text-sm">{t('pmOnboarding.itNotice')}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itSystems')}</label>
                    <textarea value={currentTechStack} onChange={(e) => setCurrentTechStack(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itIntegrations')}</label>
                    <textarea value={integrations} onChange={(e) => setIntegrations(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itAutomation')}</label>
                    <input type="text" value={workflowAutomation} onChange={(e) => setWorkflowAutomation(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itCloud')}</label>
                    <input type="text" value={cloudInfrastructure} onChange={(e) => setCloudInfrastructure(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itCyber')}</label>
                    <input type="text" value={cybersecurity} onChange={(e) => setCybersecurity(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.itLegacy')}</label>
                    <textarea value={legacySystems} onChange={(e) => setLegacySystems(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-xl mb-4 flex gap-3 items-start">
                    <ShieldCheck className="shrink-0 mt-0.5" size={20} />
                    <p className="text-sm">{t('pmOnboarding.compNotice')}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compRegs')}</label>
                    <textarea value={regulatoryFrameworks} onChange={(e) => setRegulatoryFrameworks(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compGovDev')}</label>
                    <input type="text" value={governanceDev} onChange={(e) => setGovernanceDev(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compPolicies')}</label>
                    <textarea value={existingPolicies} onChange={(e) => setExistingPolicies(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compAssessments')}</label>
                    <input type="text" value={recentAssessments} onChange={(e) => setRecentAssessments(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compAudits')}</label>
                    <input type="text" value={expectedAudits} onChange={(e) => setExpectedAudits(e.target.value)} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.compImprovements')}</label>
                    <textarea value={governanceImprovements} onChange={(e) => setGovernanceImprovements(e.target.value)} rows={2} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                </div>
              )}

              {step === 10 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 block mb-2">{t('pmOnboarding.commMethod')}</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Email', 'Microsoft Teams', 'Zoom', 'Google Meet', 'Phone'].map(method => (
                        <div
                          key={method}
                          onClick={() => setCommunicationMethod(method)}
                          className={`cursor-pointer border rounded-xl p-3 text-center font-bold text-sm transition-all ${communicationMethod === method ? 'border-[#61FD51] bg-[#61FD51]/10 text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800 text-white'}`}
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 block mb-2">{t('pmOnboarding.commFreq')}</label>
                    <div className="flex gap-4">
                      {[t('pmOnboarding.freqWeekly'), t('pmOnboarding.freqBiweekly'), t('pmOnboarding.freqMonthly')].map(freq => (
                        <button key={freq} type="button" onClick={() => setUpdateFrequency(freq)} className={`flex-1 py-3 border rounded-xl font-bold transition-all ${updateFrequency === freq ? 'border-[#61FD51] bg-[#61FD51]/10 text-[#61FD51]' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800'}`}>{freq}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">{t('pmOnboarding.commRecipients')}</label>
                    <textarea value={reportRecipients} onChange={(e) => setReportRecipients(e.target.value)} rows={2} placeholder={t('pmOnboarding.commRecipientsPlaceholder')} className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#61FD51]" />
                  </div>
                </div>
              )}

              {step === 11 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-2xl">
                  <div className="border-2 border-dashed border-white/20 rounded-3xl p-12 text-center hover:border-[#61FD51]/50 transition-colors bg-slate-900/20 cursor-pointer flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#61FD51]/10 text-[#61FD51] flex items-center justify-center mb-6">
                      <Upload size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('pmOnboarding.docUploadTitle')}</h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                      {t('pmOnboarding.docUploadDesc')}
                    </p>
                    <button type="button" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">{t('pmOnboarding.browseFiles')}</button>
                  </div>
                  
                  {/* Mock file list - in a real app this would reflect uploadedDocuments state */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-card border border-white/5 rounded-xl">
                      <FileText className="text-blue-400" size={24} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">Example_Architecture.pdf</p>
                        <p className="text-xs text-slate-500">2.4 MB</p>
                      </div>
                      <CheckCircle className="text-[#61FD51]" size={20} />
                    </div>
                  </div>
                </div>
              )}

              {step === 12 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both max-w-3xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {widgetOptions.map(widget => {
                      const isSelected = dashboardWidgets.includes(widget);
                      return (
                        <div
                          key={widget}
                          onClick={() => handleToggleArrayItem(widget, dashboardWidgets, setDashboardWidgets)}
                          className={`
                            cursor-pointer border rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all h-32 justify-center
                            ${isSelected ? 'border-[#61FD51] bg-[#61FD51]/10 text-[#61FD51] shadow-lg shadow-[#61FD51]/10' : 'border-white/10 bg-slate-900/40 hover:bg-slate-800 text-slate-300'}
                          `}
                        >
                          <div className={isSelected ? 'text-[#61FD51]' : 'text-slate-500'}>
                            {widget === 'Project Progress' && <BarChart size={28} />}
                            {widget === 'Milestones' && <CheckCircle size={28} />}
                            {widget === 'Tasks' && <Layout size={28} />}
                            {widget === 'Risks' && <AlertTriangle size={28} />}
                            {widget === 'Compliance Status' && <ShieldCheck size={28} />}
                            {widget === 'System Health' && <Activity size={28} />}
                            {widget === 'Budget Tracking' && <BarChart size={28} />}
                            {widget === 'Team Activity' && <Users size={28} />}
                            {widget === 'Recent Documents' && <FileText size={28} />}
                            {widget === 'Upcoming Meetings' && <MessageSquare size={28} />}
                            {widget === 'Notifications' && <Activity size={28} />}
                          </div>
                          <span className="text-sm font-bold">{widget}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 13 && (
                <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                  <div className="w-24 h-24 bg-[#61FD51]/10 border border-[#61FD51]/20 text-[#61FD51] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-2xl shadow-[#61FD51]/20">
                    <Laptop size={48} />
                  </div>

                  <div className="max-w-2xl mx-auto p-8 bg-card border border-white/10 rounded-3xl text-left space-y-6 font-mono text-base text-slate-400 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewOrg')}</span>
                        <p className="text-white font-bold">{companyName || t('pmOnboarding.notProvided')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewProj')}</span>
                        <p className="text-white font-bold">{projectName || t('pmOnboarding.notProvided')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewSvc')}</span>
                        <p className="text-[#61FD51] font-bold text-sm leading-tight">{selectedService || t('pmOnboarding.notProvided')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewTeam')}</span>
                        <p className="text-white font-bold">{teamMembers.length + stakeholders.length} {t('pmOnboarding.invited')}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewComm')}</span>
                        <p className="text-white font-bold">{communicationMethod} {updateFrequency ? `(${updateFrequency})` : ''}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">{t('pmOnboarding.reviewDash')}</span>
                        <p className="text-white font-bold">{dashboardWidgets.length} {t('pmOnboarding.widgetsSelected')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Navigation */}
            <div className="sticky bottom-0 pt-6 pb-2 bg-gradient-to-t from-background via-background to-transparent flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-0 mt-auto z-50">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-2xl font-bold text-lg tracking-wide transition-colors flex justify-center items-center gap-2 shadow-md cursor-pointer"
                >
                  <ChevronLeft size={24} />
                  {t('pmOnboarding.backBtn')}
                </button>
              ) : (
                <div className="hidden sm:block"></div>
              )}

              <button
                type="button"
                onClick={step === TOTAL_STEPS ? handleFinish : handleNext}
                disabled={
                  (step === 2 && !companyName) || 
                  (step === 3 && !projectName) || 
                  (step === 4 && !selectedService)
                }
                className="w-full sm:w-auto bg-[#61FD51] hover:bg-[#52d743] text-slate-950 px-14 py-4 rounded-2xl font-black text-lg tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#61FD51]/20 hover:shadow-[#61FD51]/30 active:scale-[0.98] flex justify-center items-center gap-2 cursor-pointer"
              >
                {step === TOTAL_STEPS ? t('pmOnboarding.launchBtn') : t('pmOnboarding.continueBtn')}
                {step < TOTAL_STEPS && <ChevronRight size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
