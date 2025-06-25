
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Users, Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Team {
  id: string;
  name: string;
  avatar: string;
  isRecent: boolean;
}

const mockTeams: Team[] = [
  { id: '1', name: 'Product Development', avatar: 'PD', isRecent: true },
  { id: '2', name: 'Engineering', avatar: 'ENG', isRecent: true },
  { id: '3', name: 'Marketing Team', avatar: 'MT', isRecent: true },
  { id: '4', name: 'Design System', avatar: 'DS', isRecent: false },
  { id: '5', name: 'Sales Operations', avatar: 'SO', isRecent: false },
  { id: '6', name: 'Customer Success', avatar: 'CS', isRecent: false },
];

interface TeamSwitcherProps {
  currentTeam?: Team;
  onTeamChange: (team: Team) => void;
}

export const TeamSwitcher: React.FC<TeamSwitcherProps> = ({
  currentTeam = mockTeams[0],
  onTeamChange
}) => {
  const [showAllTeams, setShowAllTeams] = useState(false);

  const recentTeams = mockTeams.filter(team => team.isRecent);
  const allTeams = mockTeams;

  const teamsToShow = showAllTeams ? allTeams : recentTeams;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 h-9">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
              {currentTeam.avatar}
            </div>
            <span className="font-medium">{currentTeam.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="start">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Switch Team
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {!showAllTeams && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              Recent Teams
            </DropdownMenuLabel>
            {recentTeams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => onTeamChange(team)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {team.avatar}
                </div>
                <span>{team.name}</span>
                {team.id === currentTeam.id && (
                  <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowAllTeams(true)}
              className="text-muted-foreground cursor-pointer"
            >
              Show all teams
            </DropdownMenuItem>
          </>
        )}

        {showAllTeams && (
          <>
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
              All Teams
            </DropdownMenuLabel>
            {allTeams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => onTeamChange(team)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                  {team.avatar}
                </div>
                <span>{team.name}</span>
                {team.id === currentTeam.id && (
                  <Badge variant="secondary" className="ml-auto text-xs">Current</Badge>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowAllTeams(false)}
              className="text-muted-foreground cursor-pointer"
            >
              Show recent teams only
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-muted-foreground cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Create new team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
